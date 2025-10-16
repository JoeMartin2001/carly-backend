import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { DatabaseModule } from './infra/database/database.module';
// import { ConfigModule } from './infra/config/config.module';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
})
export class AppModule {}
