import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(process.cwd(), 'libs/proto/user.proto'),
          url: process.env.USER_SERVICE_URL,
        },
      },
    ]),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [UserController],
  providers: [UserResolver, UserService],
})
export class UserModule {}
