import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '@/shared/config/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from '@/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(({
      envFilePath: join(process.cwd(), '.env'),
      isGlobal: true,
    })),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService<AppConfig>) =>
        ({
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_NAME'),
          namingStrategy: new SnakeNamingStrategy(),
          autoLoadEntities: true,
          synchronize: true,
          logger: 'file',
          logging: true,
        }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
