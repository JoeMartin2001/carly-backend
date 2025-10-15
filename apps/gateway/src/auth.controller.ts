import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  VerifyTokenResponse,
  VerifyTokenRequest,
} from '@proto/auth';

interface IAuthService {
  login(data: LoginRequest): Observable<AuthResponse>;
  register(data: RegisterRequest): Observable<AuthResponse>;
  verifyToken(data: VerifyTokenRequest): Observable<VerifyTokenResponse>;
}

@Controller('auth')
export class AuthController {
  private authService: IAuthService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }

  @Post('login')
  async login(@Body() loginRequest: LoginRequest) {
    console.log('📩 Received gRPC request:', loginRequest);

    if (!loginRequest) {
      throw new BadRequestException('Invalid request body');
    }

    if (!loginRequest.email || !loginRequest.password) {
      throw new BadRequestException('Email and password are required');
    }

    const result = await lastValueFrom(this.authService.login(loginRequest));

    return result;
  }
}
