import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(id: string) {
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
  }
}
