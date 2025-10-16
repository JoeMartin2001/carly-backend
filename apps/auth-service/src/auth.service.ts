import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, LoginRequest } from '@proto/auth';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(data: LoginRequest): AuthResponse {
    console.log('📩 Received gRPC request:', data);

    return {
      accessToken: '123',
      refreshToken: '456',
    };
  }

  private async signPair(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
