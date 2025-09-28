import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface TokenPayload {
  sub: number;
  username: string;
}

interface RequestWithUser extends Request {
  user?: { id: number; username: string };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload =
        await this.jwtService.verifyAsync<TokenPayload>(token);

      request.user = {
        id: tokenPayload.sub,
        username: tokenPayload.username,
      };

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
