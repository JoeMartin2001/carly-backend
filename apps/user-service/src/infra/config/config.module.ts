import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './register-app.config';
import databaseConfig from './register-database.config';
import { Environment, validate } from './env.validation';
import path from 'path';

console.log(path.join(process.cwd(), 'apps/user-service/.env.user.dev'));
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [appConfig, databaseConfig],
      envFilePath:
        process.env.NODE_ENV === Environment.Development
          ? [path.join(process.cwd(), 'apps/user-service/.env.user.dev')]
          : [path.join(process.cwd(), 'apps/user-service/.env.user')],
    }),
  ],
})
export class ConfigModule {}
