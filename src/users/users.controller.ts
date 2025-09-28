import { Controller, Get, Request } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  @Auth()
  @Get('me')
  getProfile(@Request() req) {
    return { message: 'This is the user profile', user: req.user };
  }
}
