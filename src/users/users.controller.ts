import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UsersService } from './users.service';
import type { UserRequest, UserResponse } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth()
  @Get('me')
  getProfile(@Request() req) {
    return { message: 'This is the user profile', user: req.user };
  }

  @Get()
  index() {
    return this.usersService.getAllUsers();
  }

  @Post()
  store(@Body() req: UserRequest): Promise<UserResponse> {
    return this.usersService.createUser(req);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.findUserByAttribute('id', id);
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
