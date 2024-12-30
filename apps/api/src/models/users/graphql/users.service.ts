import { Injectable, UnauthorizedException } from '@nestjs/common'
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import {
  LoginInput,
  LoginOutput,
  RegisterUserWithCredetialsInput,
  RegisterUserWithProviderInput,
} from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'
import * as bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUserWithCredetials({
    email,
    name,
    password,
    image,
  }: RegisterUserWithCredetialsInput) {
    const isaltreadyexist = await this.prisma.credentials.findUnique({
      where: { email },
    })

    const hashedpassword = await bcrypt.hash(password, 10)

    const uid = uuid()

    if (isaltreadyexist) {
      throw new Error('Email already exist')
    }

    return await this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        Credentials: {
          create: {
            email,
            passwordHash: hashedpassword,
          },
        },
        AuthProvider: {
          create: {
            type: 'CREDENTIALS',
          },
        },
      },
      include: {
        Credentials: true,
      },
    })
  }

  registerUserWithProvider({
    image,
    name,
    type,
    uid,
  }: RegisterUserWithProviderInput) {
    return this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        AuthProvider: {
          create: {
            type,
          },
        },
      },
    })
  }

  findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args)
  }

  findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args)
  }

  update(updateUserInput: UpdateUserInput) {
    const { uid, ...data } = updateUserInput
    return this.prisma.user.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueUserArgs) {
    return this.prisma.user.delete(args)
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    const user = await this.prisma.user.findFirst({
      where: {
        Credentials: { email },
      },
      include: {
        Credentials: true,
      },
    })

    if (!user) {
      throw new UnauthorizedException('User not found invalid credentials')
    }

    const isValidPassowrd = bcrypt.compareSync(
      password,
      user.Credentials.passwordHash,
    )
    if (!isValidPassowrd) {
      throw new UnauthorizedException('Invalid password or email')
    }

    const jsonToken = this.jwtService.sign(
      { uid: user.uid },
      {
        algorithm: 'HS256',
      },
    )
    return { token: jsonToken }
  }
}
