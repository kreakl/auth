import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { AuthController } from '@/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { options } from '@/auth/config/jwt-module.config';
import { UserModule } from '@/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '@/auth/entities/token.entity';

@Module({
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  imports: [ TypeOrmModule.forFeature([Token]), PassportModule, JwtModule.registerAsync(options()), UserModule],
})
export class AuthModule {}
