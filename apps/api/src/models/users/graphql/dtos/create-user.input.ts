import {
  Field,
  InputType,
  ObjectType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql'
import { User } from '../entity/user.entity'
import { $Enums, AuthProviderType } from '@prisma/client'

registerEnumType($Enums.AuthProviderType, {
  name: 'AuthProviderType',
})
@InputType()
export class RegisterUserWithProviderInput extends PickType(
  User,
  ['uid', 'name', 'image'],
  InputType,
) {
  @Field(() => AuthProviderType)
  type: AuthProviderType
}

@InputType()
export class RegisterUserWithCredetialsInput {
  name: string
  email: string
  password: string
  image?: string
}

@InputType()
export class LoginInput extends PickType(RegisterUserWithCredetialsInput, [
  'email',
  'password',
]) {}

@ObjectType()
export class LoginOutput {
  token: string
}
