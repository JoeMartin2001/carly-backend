import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AuthResponse,
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '@proto/auth';
import { Observable } from 'rxjs';

interface IAuthService {
  login(data: LoginRequest): Observable<AuthResponse>;
  register(data: RegisterRequest): Observable<AuthResponse>;
  validateToken(data: ValidateTokenRequest): Observable<ValidateTokenResponse>;
  refreshToken(data: RefreshTokenRequest): Observable<RefreshTokenResponse>;
}

@Injectable()
export class AuthService {
  private authService: IAuthService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.authService.login(data);
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.authService.register(data);
  }

  validateToken(data: ValidateTokenRequest): Observable<ValidateTokenResponse> {
    return this.authService.validateToken(data);
  }

  refreshToken(data: RefreshTokenRequest): Observable<RefreshTokenResponse> {
    return this.authService.refreshToken(data);
  }
}
