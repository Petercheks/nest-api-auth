import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponse, AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() req: { username: string; password: string },
  ): Promise<AuthResponse> {
    return this.authService.authenticate(req);
  }
}
