import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import type {
  FindOneById,
  User,
  FindAllRequest,
  FindAllResponse,
} from '@proto/user';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'FindOne')
  findOne(data: FindOneById): User {
    console.log('📩 Received gRPC request:', data);

    return this.userService.findOne(data.id);
  }

  @GrpcMethod('UserService', 'FindAll')
  findAll(data: FindAllRequest): FindAllResponse {
    console.log(`FindAll users: ${JSON.stringify(data)}`);

    const users = this.userService.findAll();

    return { users };
  }
}
