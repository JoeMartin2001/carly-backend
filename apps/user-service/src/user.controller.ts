import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'FindOne')
  findOne(data: { id: string }) {
    console.log('📩 Received gRPC request:', data);

    return this.userService.findOne(data.id);
  }
}
