import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from './infra/config/config.module';
import { JwtModule } from './infra/jwt/jwt.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserService } from './modules/user/user.service';

@Module({
  providers: [AppService, UserService],
  controllers: [AppController],
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule,
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
  ],
})
export class AppModule {}
