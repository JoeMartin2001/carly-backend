import { Controller, Get, Query, Inject, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface IUserService {
  findOne(data: {
    id: string;
  }): Observable<{ id: string; name: string; email: string }>;
}

@Controller('users')
export class UserController implements OnModuleInit {
  private userService: IUserService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  @Get()
  async getUser(@Query('id') id: string) {
    const result = await this.userService.findOne({ id }).toPromise();

    return result;
  }

  @Get('test')
  async testGrpc(@Query('id') id: string) {
    try {
      const result = await this.userService.findOne({ id }).toPromise();
      return result;
    } catch (e) {
      console.error(e);
      return { error: e as string };
    }
  }
}
