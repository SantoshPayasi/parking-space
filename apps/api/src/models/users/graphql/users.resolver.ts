import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entity/user.entity'
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args'
import {
  LoginInput,
  LoginOutput,
  RegisterUserWithCredetialsInput,
  RegisterUserWithProviderInput,
} from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  // @AllowAuthenticated()
  @Mutation(() => User)
  async RegisterUserWithCredentials(
    @Args('RegisterUserWithCredetialsInput')
    args: RegisterUserWithCredetialsInput,
  ) {
    try {
      const user = this.usersService.registerUserWithCredetials(args)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  @Mutation(() => User)
  async RegisterUserWithProvider(
    @Args('RegisterUserWithProviderInput')
    args: RegisterUserWithProviderInput,
  ) {
    try {
      const user = this.usersService.registerUserWithProvider(args)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args() args: FindManyUserArgs) {
    return this.usersService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => User, { name: 'user' })
  findOne(@Args() args: FindUniqueUserArgs, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.where.uid)
    return this.usersService.findOne(args)
  }

  @AllowAuthenticated()
  @Query(() => User)
  whoami(@GetUser() user: GetUserType) {
    return this.usersService.findOne({ where: { uid: user.uid } })
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') args: UpdateUserInput,
    @GetUser() user: GetUserType,
  ) {
    const userdata = await this.prisma.user.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, user.uid)
    return this.usersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async removeUser(
    @Args() args: FindUniqueUserArgs,
    @GetUser() user: GetUserType,
  ) {
    const userdata = await this.prisma.user.findUnique(args)
    checkRowLevelPermission(user, user.uid)
    return this.usersService.remove(args)
  }

  @Mutation(() => LoginOutput)
  async login(@Args('loginInput') args: LoginInput) {
    return this.usersService.login(args)
  }
}
