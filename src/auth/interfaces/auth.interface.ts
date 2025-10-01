import { Request } from 'express';

export interface SignInData {
  id: string;
  username: string;
}

export interface AuthResponse {
  accessToken: string;
  id: string;
  username: string;
}

export interface TokenPayload {
  sub: string;
  username: string;
}

export interface RequestWithUser extends Request {
  user?: { id: string; username: string };
}
