import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import type { AuthResponse, LoginRequest } from '@proto/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Login')
  login(data: LoginRequest): AuthResponse {
    console.log('📩 Received gRPC request:', data);

    return this.authService.login(data);
  }
}
