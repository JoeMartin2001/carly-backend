import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

type IUser = { id: string; name: string; email: string };

interface IUserService {
  findOne(data: { id: string }): Observable<IUser>;
  findAll(data: any): Observable<IUser[]>;
}

@Controller('users')
export class UserController implements OnModuleInit {
  private userService: IUserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  @Get()
  async getUsers() {
    const users = await lastValueFrom(this.userService.findAll({}));

    return users;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const result = await lastValueFrom(this.userService.findOne({ id }));

    return result;
  }
}
