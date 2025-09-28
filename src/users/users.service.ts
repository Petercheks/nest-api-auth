import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.interface';

const users: User[] = [
  {
    id: 1,
    username: 'john',
    password: 'changeme',
  },
  {
    id: 2,
    username: 'maria',
    password: 'guess',
  },
];

@Injectable()
export class UsersService {
  async findUserByName(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
