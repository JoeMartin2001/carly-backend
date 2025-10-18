import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserRequest,
  DeleteUserRequest,
  DeleteUserResponse,
  FindAllRequest,
  FindAllResponse,
  UpdateUserRequest,
  User,
} from '@proto/user';
import { Observable } from 'rxjs';

interface IUserService {
  findOne(data: { id: string }): Observable<User>;
  findAll(data: FindAllRequest): Observable<FindAllResponse>;
  createUser(data: CreateUserRequest): Observable<User>;
  updateUser(data: UpdateUserRequest): Observable<User>;
  deleteUser(data: DeleteUserRequest): Observable<DeleteUserResponse>;
}

@Injectable()
export class UserService {
  private userService: IUserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  findOne(data: { id: string }) {
    return this.userService.findOne(data);
  }

  findAll(data: FindAllRequest) {
    return this.userService.findAll(data);
  }

  createUser(data: CreateUserRequest) {
    return this.userService.createUser(data);
  }

  updateUser(data: UpdateUserRequest) {
    return this.userService.updateUser(data);
  }

  deleteUser(data: DeleteUserRequest) {
    return this.userService.deleteUser(data);
  }
}
