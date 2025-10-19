import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthResponse, LoginRequest, RegisterRequest } from '@proto/auth';
import { Observable } from 'rxjs';

interface IAuthService {
  login(data: LoginRequest): Observable<AuthResponse>;
  register(data: RegisterRequest): Observable<AuthResponse>;
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
}
