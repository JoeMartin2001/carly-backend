import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import type {
  FindOneById,
  User,
  FindAllRequest,
  CreateUserRequest,
  UpdateUserRequest,
  FindOneByEmail,
  FindAllResponse,
  FindUserResponse,
} from '@proto/user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: CreateUserRequest): Promise<User> {
    console.log('(USER - CREATE) 📩 Received gRPC request:', data);

    return await this.appService.create(data);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async update(data: UpdateUserRequest): Promise<User> {
    console.log('(USER - UPDATE) 📩 Received gRPC request:', data);

    const user = await this.appService.update(data);

    console.log('(USER - UPDATE) 📩 Response:', user);

    return user;
  }

  @GrpcMethod('UserService', 'FindOne')
  async findOne(data: FindOneById): Promise<FindUserResponse> {
    console.log('(USER - FIND ONE) 📩 Received gRPC request:', data);

    const user = await this.appService.findOne(data.id);

    console.log('(USER - FIND ONE) 📩 Response:', user);

    return { user: user ?? undefined };
  }

  @GrpcMethod('UserService', 'FindByEmail')
  async findByEmail(data: FindOneByEmail): Promise<FindUserResponse> {
    console.log('(USER - FIND ONE BY EMAIL) 📩 Received gRPC request:', data);

    const user = await this.appService.findByEmail(data.email);

    console.log('(USER - FIND ONE BY EMAIL) 📩 Response:', user);

    return { user: user ?? undefined };
  }

  @GrpcMethod('UserService', 'FindAll')
  async findAll(data: FindAllRequest = {}): Promise<FindAllResponse> {
    console.log(
      `(USER - FIND ALL) 📩 Received gRPC request: ${JSON.stringify(data)}`,
    );

    const users = await this.appService.findAll(data);

    console.log('(USER - FIND ALL) 📩 Response:', users);

    return { users };
  }
}
