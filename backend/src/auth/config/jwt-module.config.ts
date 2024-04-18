import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { AppConfig } from '@/shared/config/config';

const jwtModuleOptions = (config: ConfigService<AppConfig>): JwtModuleOptions => ({
  secret: config.get('JWT_TOKEN_SECRET'),
  signOptions: {
    expiresIn: config.get('JWT_TOKEN_EXP', '5m'),
  },
});

export const options = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService<AppConfig>) => jwtModuleOptions(config),
});
