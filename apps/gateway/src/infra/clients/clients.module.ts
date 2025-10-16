import { Module } from '@nestjs/common';
import {
  ClientsModule as NestClientsModule,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    NestClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(process.cwd(), 'libs/proto/user.proto'),
          url: process.env.USER_SERVICE_URL,
        },
      },
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
})
export class ClientsModule {}
