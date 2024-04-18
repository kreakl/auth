export type SessionDto = {
  userId: number;
  accessToken: string
  refreshToken: string;
  expiresIn: number;
}

export type LoginRequestBody = {
  login: string;
  password: string;
}

export type UpdateUserBody = Partial<LoginRequestBody> & {
  fullName?: string;
}

export type UserDto = {
  id: number
  login: string;
  createdAt: string;
  fullName?: string;
}
