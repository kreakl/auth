import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '@/auth/entities/types';
import { User } from '@/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (key: keyof TokenPayload, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.user[key] : request.user;
  },
);
