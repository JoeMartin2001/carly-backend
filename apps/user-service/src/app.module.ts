import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from './infra/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './common/entities/user.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,

    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
