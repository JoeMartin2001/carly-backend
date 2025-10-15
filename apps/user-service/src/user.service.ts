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

  findAll() {
    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      {
        id: '2',
        name: 'Mike',
        email: 'mike.doe@example.com',
      },
    ];
  }
}
