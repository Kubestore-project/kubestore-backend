import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { RefreshToken } from './refreshToken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken]), JwtModule.register({})],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
