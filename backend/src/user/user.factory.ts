import { CreateUserDto } from '@/user/dto/create-user.dto';
import { User } from '@/user/entities/user.entity';
import { genSaltSync, hashSync } from 'bcrypt';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactory {
  create(dto: CreateUserDto) {
    const user  = new User();

    user.login = dto.login;
    user.password = this.hashUserPassword(dto.password)
    user.fullName = dto.fullName;

    return user;
  }

  update(dto: UpdateUserDto) {
    const user  = new User();

    user.login = dto.login || user.login;
    user.password = dto.password ? this.hashUserPassword(dto.password) : user.password;
    user.fullName = dto.fullName;

    return user;
  }

  private hashUserPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
