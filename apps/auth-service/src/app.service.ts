import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
import { ClientGrpc } from '@nestjs/microservices';

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
      throw new NotFoundException('User not found');
    }

    console.log('user', user);

    if (user.password !== data.password) {
      throw new UnauthorizedException('Invalid credentials');
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
      throw new ConflictException('User already exists');
    }

    console.log('user', user);

    const newUser = await lastValueFrom(this.userService.createUser(data));

    console.log('newUser', newUser);

    if (!newUser) {
      throw new InternalServerErrorException('Failed to create user');
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
