// src/modules/user/dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { UserPartial } from '@proto/user';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput implements UserPartial {
  @Field()
  @IsString()
  @IsOptional()
  name?: string;

  @Field()
  @IsString()
  @IsOptional()
  email?: string;

  @Field()
  @IsString()
  @IsOptional()
  password?: string;
}
