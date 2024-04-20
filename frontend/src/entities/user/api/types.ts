export type UserDto = {
  id: number;
  fullName?: string;
  login: string;
  createdAt: string;
};

export type CreateUserDto = {
  login: string;
  password: string;
  fullName: string;
};

export type UpdateUserDto = Partial<CreateUserDto> & {
  id: number;
};
