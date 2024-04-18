import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserFactory } from '@/user/user.factory';

@Injectable()
export class UserService {
  constructor(
    private readonly userFactory: UserFactory,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    const { login } = createUserDto;

    if (await this.isUserWithLoginAlreadyExists(login)) {
      throw new ConflictException('User with provided login is already exists');
    }

    const user = this.userFactory.create(createUserDto);

    return this.userRepository.save(user);
  }

  async isUserWithLoginAlreadyExists(login: string) {
    return !!(await this.findUserByLogin(login));
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({
      id,
    });
  }

  findUserByLogin(login: string) {
    return this.userRepository.findOneBy({
      login,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { login } = updateUserDto;
    const user = this.userFactory.update(updateUserDto);

    if (login && await this.isUserWithLoginAlreadyExists(login)) {
      throw new ConflictException('User with provided login is already exists');
    }

    const { affected } = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(user)
      .where("id = :id", { id })
      .execute()

    if (!affected) {
      throw new UnprocessableEntityException('User does not exist');
    }
  }
}
