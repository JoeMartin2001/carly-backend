import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import type {
  AuthResponse,
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '@proto/auth';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { UserService } from './modules/user/user.service';

@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @GrpcMethod('AuthService', 'Login')
  async login(data: LoginRequest): Promise<AuthResponse> {
    console.log('📩 Received gRPC request:', data);

    return await this.appService.login(data);
  }

  @GrpcMethod('AuthService', 'Register')
  async register(data: RegisterRequest): Promise<AuthResponse> {
    console.log('(AUTH - REGISTER) 📩 Received gRPC request:', data);

    return await this.appService.register(data);
  }

  @GrpcMethod('AuthService', 'ValidateToken')
  async validateToken(
    data: ValidateTokenRequest,
  ): Promise<ValidateTokenResponse> {
    console.log('(AUTH - VALIDATE TOKEN) 📩 Received gRPC request:', data);

    const payload = this.jwtService.verify<{ email: string }>(data.token);

    const { user } = await lastValueFrom(
      this.userService.findByEmail({ email: payload.email }),
    );

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    return { user: user };
  }

  @GrpcMethod('AuthService', 'RefreshToken')
  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    console.log('(AUTH - REFRESH TOKEN) 📩 Received gRPC request:', data);

    try {
      const { accessToken, refreshToken, user } =
        await this.appService.refreshToken(data.token);

      return {
        accessToken,
        refreshToken,
        user,
      };
    } catch (error) {
      console.error('[AUTH] Refresh token failed:', error);
      throw new RpcException({
        code: status.UNAUTHENTICATED, // 16 = UNAUTHENTICATED
        message: 'Invalid or expired refresh token',
      });
    }
  }
}
