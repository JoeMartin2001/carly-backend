import { Field, InputType } from '@nestjs/graphql';
import { LoginRequest } from '@proto/auth';
import { IsString } from 'class-validator';

@InputType()
export class LoginInput implements LoginRequest {
  @Field()
  @IsString()
  email!: string;

  @Field()
  @IsString()
  password!: string;
}
