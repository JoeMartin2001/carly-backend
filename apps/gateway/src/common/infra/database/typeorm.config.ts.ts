import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/infra/config/env.validation';
import { UserEntity } from 'src/common/entities/user.entity';

export const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres' as const,
  host: config.get<string>('database.host'),
  port: config.get<number>('database.port'),
  username: config.get<string>('database.username'),
  password: config.get<string>('database.password'),
  database: config.get<string>('database.name'),
  ssl: config.get<boolean>('database.ssl'),
  autoLoadEntities: true,
  synchronize: [Environment.Development, Environment.Local].includes(
    config.get<Environment>('app.nodeEnv')!,
  ), // use migrations instead
  logging: [Environment.Development, Environment.Local].includes(
    config.get<Environment>('app.nodeEnv')!,
  )
    ? ['query', 'error', 'schema']
    : false,
  entities: [UserEntity],
  // dropSchema: true,
});
