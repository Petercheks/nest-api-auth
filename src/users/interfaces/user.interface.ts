export interface User {
  email?: string | null;
  username: string;
  password: string;
}

export interface UserRequest {
  email?: string | null;
  username: string;
  password: string;
}

export interface UserUpdateRequest {
  email?: string | null;
  username?: string | null;
  password?: string | null;
}

export interface UserResponse extends Omit<User, 'password'> {
  id: string;
}
