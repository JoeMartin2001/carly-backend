// src/modules/user/dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { CreateUserRequest } from '@proto/user';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput implements CreateUserRequest {
  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsString()
  email!: string;

  @Field()
  @IsString()
  password!: string;
}
