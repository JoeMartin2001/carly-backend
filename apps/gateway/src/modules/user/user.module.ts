import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [UserController],
  providers: [UserResolver],
})
export class UserModule {}
