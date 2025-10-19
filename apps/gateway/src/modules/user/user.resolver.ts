import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/common/entities/user.entity';
import { UserService } from './user.service';
import { lastValueFrom } from 'rxjs';
import { DeleteUserResponse, User } from '@proto/user';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  async users(): Promise<User[]> {
    const users = await lastValueFrom(this.userService.findAll({}));

    console.log('(GATEWAY - GET USERS) 📩 Response:', users);

    return users.users || [];
  }

  @Query(() => UserEntity)
  async user(@Args('id', { type: () => String }) id: string): Promise<User> {
    const user = await lastValueFrom(this.userService.findOne({ id }));

    console.log('(GATEWAY - GET USER) 📩 Response:', user);

    return user;
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await lastValueFrom(
      this.userService.createUser(createUserInput),
    );

    console.log('(GATEWAY - CREATE USER) 📩 Response:', user);

    return user;
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await lastValueFrom(
      this.userService.updateUser({
        id,
        data: updateUserInput,
      }),
    );

    console.log('(GATEWAY - UPDATE USER) 📩 Response:', user);

    return user;
  }

  @Mutation(() => UserEntity)
  async deleteUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<DeleteUserResponse> {
    const response = await lastValueFrom(this.userService.deleteUser({ id }));

    console.log('(GATEWAY - DELETE USER) 📩 Response:', response);

    return response;
  }
}
