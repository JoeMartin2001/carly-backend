import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserRequest,
  FindAllRequest,
  UpdateUserRequest,
  User,
} from '@proto/user';
import { DeleteResult, Repository } from 'typeorm';
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

  async updateUser(request: UpdateUserRequest): Promise<User | undefined> {
    const { data = {}, id } = request;

    const existingUser = await this.userRepository.findOne({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const updatedUser = this.userRepository.merge(existingUser, data);

    return updatedUser;
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

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
