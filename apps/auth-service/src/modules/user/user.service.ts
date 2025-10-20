import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserRequest,
  DeleteUserRequest,
  DeleteUserResponse,
  FindOneByEmail,
  FindOneById,
  FindUserResponse,
  UpdateUserRequest,
  User,
} from '@proto/user';
import { Observable } from 'rxjs';

interface IUserService {
  findOne(data: FindOneById): Observable<FindUserResponse>;
  findByEmail(data: FindOneByEmail): Observable<FindUserResponse>;
  createUser(data: CreateUserRequest): Observable<User>;
  updateUser(data: UpdateUserRequest): Observable<User>;
  deleteUser(data: DeleteUserRequest): Observable<DeleteUserResponse>;
}

@Injectable()
export class UserService {
  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  private userService: IUserService;

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  findOne(data: FindOneById) {
    return this.userService.findOne(data);
  }

  findByEmail(data: FindOneByEmail) {
    return this.userService.findByEmail(data);
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
