import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type { AuthResponse, LoginRequest, RegisterRequest } from '@proto/auth';
import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
