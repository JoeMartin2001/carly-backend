import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthResponse, LoginRequest } from '@proto/auth';
import { UserServiceClient } from '@proto/user';

@Injectable()
export class AuthService {
  private userService: UserServiceClient;

  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    console.log('📩 Received gRPC request:', data);

    // const result = await lastValueFrom(this.userService.findOne({ id: data.email }));

    const { accessToken, refreshToken } = await this.signPair({
      id: '123',
      email: 'test@test.com',
    });

    return {
      accessToken,
      refreshToken,
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
