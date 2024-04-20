import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '@/auth/dtos/login-user.dto';
import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
import { compareSync } from 'bcrypt';
import { Token } from '@/auth/entities/token.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { add } from 'date-fns';
import { AuthFactory } from '@/auth/auth.factory';

@Injectable()
export class AuthService {
  constructor(
    private readonly useService: UserService,
    private readonly authFactory: AuthFactory,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async authenticate(loginDto: LoginUserDto) {
    const user = await this.useService.findUserByLogin(loginDto.login);
    if (!user || !compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException('Incorrect login or password');
    }

    return this.updateUserTokenPair(user);
  }

  async updateUserTokenPair(user: User) {
    const tokenPair = await this.authFactory.createTokenPair(user);

    await this.tokenRepository.save({
      userId: user.id,
      refreshToken: tokenPair.refreshToken,
      exp: add(new Date(), { months: 1 }).toDateString(),
    });

    return {
      userId: user.id,
      ...tokenPair,
    };
  }

  async deleteRefreshToken(refreshToken: string) {
    const token = await this.tokenRepository.findOneBy({
      refreshToken,
    });

    if (!token) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    token.refreshToken = undefined;

    return this.tokenRepository.save(token);
  }

  async refreshTokenPair(refreshToken: string) {
    const token = await this.tokenRepository.findOne({
      relations: ['user'],
      where: {
        refreshToken: Equal(refreshToken),
      },
    });

    if (!token || new Date(token.exp) < new Date()) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return this.updateUserTokenPair(token.user);
  }
}
