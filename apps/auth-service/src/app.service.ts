import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, LoginRequest } from '@proto/auth';
import {
  CreateUserRequest,
  FindOneByEmail,
  FindOneById,
  FindUserResponse,
  UpdateUserRequest,
  User,
} from '@proto/user';
import { lastValueFrom, Observable } from 'rxjs';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

interface IUserService {
  findOne(data: FindOneById): Observable<FindUserResponse>;
  findByEmail(data: FindOneByEmail): Observable<FindUserResponse>;
  createUser(data: CreateUserRequest): Observable<User>;
  updateUser(data: UpdateUserRequest): Observable<User>;
}

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_PACKAGE') private client: ClientGrpc,
  ) {}

  private userService: IUserService;

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    console.log('📩 Received gRPC request:', data);

    const { user } = await lastValueFrom(
      this.userService.findByEmail({ email: data.email }),
    );

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND, // 5 = NOT_FOUND
        message: 'User not found',
      });
    }

    console.log('user', user);

    if (user.password !== data.password) {
      throw new RpcException({
        code: status.UNAUTHENTICATED, // 16 = UNAUTHENTICATED
        message: 'Invalid credentials',
      });
    }

    const { accessToken, refreshToken } = await this.signPair({
      id: user.id,
      email: user.email,
    });

    console.log('accessToken', accessToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(data: CreateUserRequest): Promise<AuthResponse> {
    const { user } = await lastValueFrom(
      this.userService.findByEmail({ email: data.email }),
    );

    if (user) {
      throw new RpcException({
        message: 'User already exists',
        code: status.ALREADY_EXISTS, // 11 = ALREADY_EXISTS
      });
    }

    console.log('user', user);

    const newUser = await lastValueFrom(this.userService.createUser(data));

    console.log('newUser', newUser);

    if (!newUser) {
      throw new RpcException({
        message: 'Failed to create user',
        code: status.INTERNAL, // 13 = INTERNAL
      });
    }

    const { accessToken, refreshToken } = await this.signPair({
      id: newUser.id,
      email: newUser.email,
    });

    return { accessToken, refreshToken };
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
