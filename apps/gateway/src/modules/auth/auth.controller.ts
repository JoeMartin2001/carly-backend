import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import type { AuthResponse, LoginRequest, RegisterRequest } from '@proto/auth';
import { lastValueFrom, Observable } from 'rxjs';

interface IAuthService {
  login(data: LoginRequest): Observable<AuthResponse>;
  register(data: RegisterRequest): Observable<AuthResponse>;
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

  @Post('register')
  async register(@Body() registerRequest: RegisterRequest) {
    console.log('📩 Received gRPC request:', registerRequest);

    const result = await lastValueFrom(
      this.authService.register(registerRequest),
    );

    return result;
  }
}
