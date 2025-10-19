import { Field, InputType } from '@nestjs/graphql';
import { RegisterRequest } from '@proto/auth';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class RegisterInput implements RegisterRequest {
  @Field()
  @IsString()
  email!: string;

  @Field()
  @IsString()
  password!: string;

  @Field()
  @IsString()
  name!: string;

  @Field()
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
