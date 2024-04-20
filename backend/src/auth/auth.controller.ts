import { AuthService } from '@/auth/auth.service';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Public } from '@/shared/decorators/public.decorator';
import { LoginUserDto } from '@/auth/dtos/login-user.dto';
import { RefreshTokenDto } from '@/auth/dtos/refresh-token.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('tokens')
  async authenticate(@Body() dto: LoginUserDto) {
    return this.authService.authenticate(dto);
  }

  @Post('tokens/refresh')
  async refreshTokens(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.refreshTokenPair(refreshToken);
  }

  @Delete('tokens/:refreshToken')
  async deleteRefreshToken(@Param('refreshToken') refreshToken: string) {
    return this.authService.deleteRefreshToken(refreshToken);
  }
}
