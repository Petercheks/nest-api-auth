import { Request } from 'express';

export interface SignInData {
  id: number;
  username: string;
}
export interface AuthResponse {
  accessToken: string;
  id: number;
  username: string;
}

export interface TokenPayload {
  sub: number;
  username: string;
}

export interface RequestWithUser extends Request {
  user?: { id: number; username: string };
}
