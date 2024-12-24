import { OmitType } from '@nestjs/swagger'
import { UserEntity } from '../entity/user.entity'
import { GetUserType } from 'src/common/types'
import { PickType } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class CreateUser extends PickType(UserEntity, [
  'createdAt',
  'updatedAt',
  'uid',
  'name',
]) {}
