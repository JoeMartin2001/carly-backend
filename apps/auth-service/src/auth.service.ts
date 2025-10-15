import { Injectable } from '@nestjs/common';
import { AuthResponse, LoginRequest } from '@proto/auth';

@Injectable()
export class AuthService {
  login(data: LoginRequest): AuthResponse {
    console.log('📩 Received gRPC request:', data);

    return {
      accessToken: '123',
      refreshToken: '456',
    };
  }
}
