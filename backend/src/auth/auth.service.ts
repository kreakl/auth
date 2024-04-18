import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '@/auth/dtos/login-user.dto';
import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
import { compareSync } from 'bcrypt';
import { TokenPayload } from '@/auth/entities/types';
import { v4 } from 'uuid';
import { Token } from '@/auth/entities/token.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { add } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly useService: UserService,
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
    const tokenPayload = this.createTokenPayload(user);
    const tokenPair = await this.generateTokenPair(tokenPayload);

    await this.tokenRepository
      .save({
        userId: user.id,
        refreshToken: tokenPair.refreshToken,
        exp: add(new Date(), { months: 1 }).toDateString(),
      });

    return tokenPair;
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
    console.log(refreshToken);
    const token = await this.tokenRepository.findOne({
      relations: ['user'],
      where: {
        refreshToken: Equal(refreshToken),
      },
    })

    if (!token || new Date(token.exp) < new Date()) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return this.updateUserTokenPair(token.user);
  }

  private calculateAccessTokenExpiration(accessToken: string) {
    const token = this.jwtService.decode(accessToken);
    const expAt = token.exp;
    const issuedAt = token.iat;

    return expAt - issuedAt;
  }

  private async generateTokenPair(payload: TokenPayload) {
    const accessToken = await this.jwtService.signAsync(
      payload
    );
    const refreshToken = v4();
    const expiresIn = this.calculateAccessTokenExpiration(accessToken);

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  private createTokenPayload(user: User) {
    const token = new TokenPayload();

    token.id = user.id;
    token.login = user.login;

    return { ...token };
  }
}
