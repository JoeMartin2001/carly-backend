import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './register-app.config';
import databaseConfig from './register-database.config';
import { validate } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env.user-service'],
    }),
  ],
})
export class ConfigModule {}
