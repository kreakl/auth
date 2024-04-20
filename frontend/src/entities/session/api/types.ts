export type SessionDto = {
  userId: number;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type LoginRequestDto = {
  login: string;
  password: string;
};

export type UpdateUserDto = Partial<LoginRequestDto> & {
  fullName?: string;
};

export type UserDto = {
  id: number;
  login: string;
  createdAt: string;
  fullName?: string;
};
