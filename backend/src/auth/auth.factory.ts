import { Injectable } from '@nestjs/common';
import { TokenPayload } from '@/auth/entities/types';
import { v4 } from 'uuid';
import { User } from '@/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthFactory {
  constructor(private readonly jwtService: JwtService) {}

  public async createTokenPair(user: User) {
    const payload = this.createTokenPayload(user);

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = v4();
    const expiresIn = this.calculateAccessTokenExpiration(accessToken);

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  private calculateAccessTokenExpiration(accessToken: string) {
    const token = this.jwtService.decode(accessToken);
    const expAt = token.exp;
    const issuedAt = token.iat;

    return expAt - issuedAt;
  }

  private createTokenPayload(user: User) {
    const token = new TokenPayload();

    token.id = user.id;
    token.login = user.login;

    return { ...token };
  }
}
