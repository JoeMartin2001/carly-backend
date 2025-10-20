import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { lastValueFrom, Observable } from 'rxjs';
import { ValidateTokenRequest, ValidateTokenResponse } from '@proto/auth'; // your generated gRPC client interface
import { Request } from 'express';
import { ClientGrpc } from '@nestjs/microservices';

interface IAuthService {
  validateToken(data: ValidateTokenRequest): Observable<ValidateTokenResponse>;
}

@Injectable()
export class GqlAuthGuard implements CanActivate {
  private authService: IAuthService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<{ req: Request }>().req;

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    try {
      // ✅ Call AuthService gRPC validate method
      const { user } = await lastValueFrom<ValidateTokenResponse>(
        this.authService.validateToken({ token }),
      );

      if (!user) throw new UnauthorizedException('Invalid token');

      // Attach user to GraphQL context
      req.user = user;

      return true;
    } catch (error) {
      console.error('[GATEWAY] Auth validation failed:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
