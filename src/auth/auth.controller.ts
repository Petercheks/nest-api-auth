import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './interfaces/auth.interfaces';
import { AuthRequest } from './dto/auth-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() req: AuthRequest): Promise<AuthResponse> {
    return this.authService.authenticate(req);
  }
}
