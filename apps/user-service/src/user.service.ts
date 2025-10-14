import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserById(data: { id: string }) {
    return { id: data.id, name: 'John Doe', email: 'john@example.com' };
  }
}
