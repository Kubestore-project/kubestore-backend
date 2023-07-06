import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './refreshToken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_ACCESS_KEY || 'SECRET_ACCESS',
      signOptions: {
        expiresIn: '15m',
      },
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_REFRESH_KEY || 'SECRET_REFRESH',
      signOptions: {
        expiresIn: '30d',
      },
    }),
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  providers: [TokensService],
  exports: [TokensService, JwtModule],
})
export class TokensModule {}
