import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { AuthResponse } from '@proto/auth';

@ObjectType()
export class AuthResponseEntity implements AuthResponse {
  @Field(() => String)
  accessToken!: string;

  @Field(() => String)
  refreshToken!: string;
}
