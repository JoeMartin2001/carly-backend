import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/common/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { lastValueFrom } from 'rxjs';
import { AuthResponseEntity } from './entities/auth-response-entity';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { User } from '@proto/user';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { toUserEntity } from 'src/common/utils/to-user-entity';
import { RefreshTokenRequest, RefreshTokenResponse } from '@proto/auth';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseEntity)
  async login(
    @Args('loginInput', { type: () => LoginInput }) loginInput: LoginInput,
  ): Promise<AuthResponseEntity> {
    console.log('📩 Received gRPC request:', loginInput);

    if (!loginInput) {
      throw new BadRequestException('Invalid request body');
    }

    if (!loginInput.email || !loginInput.password) {
      throw new BadRequestException('Email and password are required');
    }

    try {
      const result = await lastValueFrom(this.authService.login(loginInput));

      return result;
    } catch (error: unknown) {
      console.error('[Gateway] gRPC error:', error);

      const castedError = error as {
        code: number;
        details: string;
      };

      console.log(JSON.stringify(castedError, null, 2));

      // gRPC errors come with 'code' and 'details'
      if (castedError.code === 5) {
        throw new NotFoundException(castedError.details);
      }

      if (castedError.code === 16) {
        throw new UnauthorizedException(castedError.details);
      }

      throw new BadRequestException(
        castedError.details || 'Internal server error',
      );
    }
  }

  @Mutation(() => AuthResponseEntity)
  async register(
    @Args('registerInput', { type: () => RegisterInput })
    registerInput: RegisterInput,
  ): Promise<AuthResponseEntity> {
    const result = await lastValueFrom(
      this.authService.register(registerInput),
    );

    return result;
  }

  @Mutation(() => AuthResponseEntity)
  async refreshToken(
    @Args('refreshTokenInput', { type: () => RefreshTokenRequest })
    request: RefreshTokenRequest,
  ): Promise<AuthResponseEntity> {
    console.log('📩 Received gRPC request:', request);

    if (!request) {
      throw new BadRequestException('Invalid request body');
    }

    try {
      const result = await lastValueFrom<RefreshTokenResponse>(
        this.authService.refreshToken(request),
      );

      return result;
    } catch (error: unknown) {
      console.error('[Gateway] gRPC error:', error);

      const castedError = error as {
        code: number;
        details: string;
      };

      if (castedError.code === 16) {
        throw new UnauthorizedException(castedError.details);
      }

      throw new BadRequestException(
        castedError.details || 'Internal server error',
      );
    }
  }

  @Query(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User) {
    return toUserEntity(user);
  }
}
