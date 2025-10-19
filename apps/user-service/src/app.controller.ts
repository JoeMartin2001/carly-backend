import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
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
  DeleteUserResponse,
  DeleteUserRequest,
  UpdateUserResponse,
} from '@proto/user';
import { status } from '@grpc/grpc-js';
import { toGrpcUser } from './common/utils/to-grpc-user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: CreateUserRequest): Promise<User> {
    console.log('(USER - CREATE) 📩 Received gRPC request:', data);

    const user = await this.appService.create(data);
    return toGrpcUser(user);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    console.log('(USER - UPDATE...) 📩 Received gRPC request:', request);

    const result = await this.appService.updateUser(request);

    return { user: result ? toGrpcUser(result) : undefined };
  }

  @GrpcMethod('UserService', 'FindOne')
  async findOne(data: FindOneById): Promise<FindUserResponse> {
    console.log('(USER - FIND ONE) 📩 Received gRPC request:', data);

    const user = await this.appService.findOne(data.id);

    console.log('(USER - FIND ONE) 📩 Response:', user);

    return { user: user ? toGrpcUser(user) : undefined };
  }

  @GrpcMethod('UserService', 'FindByEmail')
  async findByEmail(data: FindOneByEmail): Promise<FindUserResponse> {
    console.log('(USER - FIND ONE BY EMAIL) 📩 Received gRPC request:', data);

    const user = await this.appService.findByEmail(data.email);

    console.log('(USER - FIND ONE BY EMAIL) 📩 Response:', user);

    return { user: user ? toGrpcUser(user) : undefined };
  }

  @GrpcMethod('UserService', 'FindAll')
  async findAll(data: FindAllRequest = {}): Promise<FindAllResponse> {
    console.log(
      `(USER - FIND ALL) 📩 Received gRPC request: ${JSON.stringify(data)}`,
    );

    const users = await this.appService.findAll(data);

    console.log('(USER - FIND ALL) 📩 Response:', users);

    return { users: users.map(toGrpcUser) };
  }

  @GrpcMethod('UserService', 'DeleteUser')
  async deleteUser(data: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user = await this.appService.findOne(data.id);

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    const result = await this.appService.remove(user.id);

    const affected = result.affected ?? 0;

    return { success: affected > 0 };
  }
}
