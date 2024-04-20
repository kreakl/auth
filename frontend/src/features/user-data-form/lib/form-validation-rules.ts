import { RegisterOptions } from 'react-hook-form';
import { CreateUserDto } from '@/entities/user';

export const userFormRules: Record<keyof CreateUserDto, RegisterOptions> = {
  login: {
    required: { value: true, message: 'Введите логин пользователя' },
    minLength: {
      value: 3,
      message: 'Логин пользователя не может быть короче трёх символов!',
    },
  },
  fullName: {
    required: {
      value: true,
      message: 'Введите имя пользователя!',
    },
    minLength: {
      value: 2,
      message: 'Имя пользователя не может быть короче трёх символов!',
    },
  },
  password: {
    required: { value: true, message: 'Введите пароль пользователя!' },
    minLength: {
      value: 2,
      message: 'Пароль пользователя не может быть короче трёх символов!',
    },
  },
};
