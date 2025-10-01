import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as schema from './schemas/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { UserRequest, UserResponse } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async getAllUsers() {
    return this.db.query.users.findMany();
  }

  async findUserByAttribute(attribute: string, value: string) {
    return this.db.query.users.findFirst({
      where: eq(schema.users[attribute], value),
    });
  }

  async createUser(userRequest: UserRequest): Promise<UserResponse> {
    const { email, username, password } = userRequest;

    const existingUsername = await this.findUserByAttribute(
      'username',
      username,
    );

    if (existingUsername) {
      throw new HttpException(
        'Username already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (email && (await this.findUserByAttribute('email', email))) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await this.db
      .insert(schema.users)
      .values({ email, username, password: hashedPassword })
      .returning();

    return user;
  }

  async deleteUserById(id: string) {
    const user = await this.findUserByAttribute('id', id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.db.delete(schema.users).where(eq(schema.users.id, id));

    return { message: 'User deleted successfully' };
  }
}
