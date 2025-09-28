import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthRequest } from './dto/auth-request.dto';
import { SignInData, AuthResponse } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(request: AuthRequest): Promise<AuthResponse> {
    const user = await this.validateUser(request);

    if (!user) {
      throw new HttpException(
        {
          error: 'Invalid credentials',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.signIn(user);
  }

  async validateUser(request: AuthRequest): Promise<SignInData | null> {
    const user = await this.usersService.findUserByName(request.username);
    if (user && user.password === request.password) {
      return { id: user.id, username: user.username };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResponse> {
    const tokenPayload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { accessToken, id: user.id, username: user.username };
  }
}
