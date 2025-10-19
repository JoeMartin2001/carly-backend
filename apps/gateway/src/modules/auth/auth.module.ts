import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(process.cwd(), 'libs/proto/auth.proto'),
          url: process.env.AUTH_SERVICE_URL,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
