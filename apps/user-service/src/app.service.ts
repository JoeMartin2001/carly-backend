import { Injectable } from '@nestjs/common';
import {
  CreateUserRequest,
  FindAllRequest,
  UpdateUserRequest,
  User,
} from '@proto/user';
import { Repository } from 'typeorm';
import { UserEntity } from './common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserRequest): Promise<User> {
    return await this.userRepository.save(data);
  }

  update(data: UpdateUserRequest): Promise<User> {
    return this.userRepository.save(data);
  }

  findOne(id: string): Promise<User | null> {
    const user = this.userRepository.findOne({ where: { id } });

    return user;
  }

  findAll(data: FindAllRequest = {}): Promise<User[]> {
    return this.userRepository.find(data);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
