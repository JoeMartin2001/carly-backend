import { Injectable } from '@nestjs/common';
import { User } from '@proto/user';

@Injectable()
export class UserService {
  findOne(id: string): User {
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      avatarUrl: 'https://example.com/avatar.png',
      createdAt: new Date(),
      createdBy: 'system',
      updatedAt: new Date(),
      updatedBy: 'system',
    };
  }

  findAll() {
    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
        avatarUrl: 'https://example.com/avatar.png',
        createdAt: new Date(),
        createdBy: 'system',
        updatedAt: new Date(),
        updatedBy: 'system',
      },
      {
        id: '2',
        name: 'Mike',
        email: 'mike.doe@example.com',
        password: 'password',
        avatarUrl: 'https://example.com/avatar.png',
        createdAt: new Date(),
        createdBy: 'system',
        updatedAt: new Date(),
        updatedBy: 'system',
      },
    ];
  }
}
