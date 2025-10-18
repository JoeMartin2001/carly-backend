import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { UserService } from './user.service';
import {
  CreateUserRequest,
  UpdateUserResponse,
  User,
  UserPartial,
} from '@proto/user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await lastValueFrom(this.userService.findAll({}));

    console.log('(GATEWAY - GET USERS) 📩 Response:', users);

    return users.users;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const result = await lastValueFrom(this.userService.findOne({ id }));

    return result;
  }

  @Post()
  async createUser(@Body() data: CreateUserRequest) {
    const result = await lastValueFrom(this.userService.createUser(data));

    return result;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserPartial,
  ): Promise<UpdateUserResponse> {
    console.log('(GATEWAY - UPDATE USER) 📩 Received request:', data);

    const result = await lastValueFrom(
      this.userService.updateUser({ data, id }),
    );

    console.log('(GATEWAY - UPDATE USER) 📩 Response:', result);

    return { user: result ?? undefined };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    const result = await lastValueFrom(this.userService.deleteUser({ id }));

    return result.success;
  }
}
