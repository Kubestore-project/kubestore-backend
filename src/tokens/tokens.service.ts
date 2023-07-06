import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from './refreshToken.entity';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(RefreshToken)
    private readonly tokenRepository: Repository<RefreshToken>,
  ) {}

  async generateAccessToken(user: User) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(user: User) {
    const payload = { userId: user.id };
    return this.jwtService.sign(payload);
  }

  async saveRefreshToken(token: string, user: User) {
    const refreshToken = new RefreshToken();
    refreshToken.token = token;
    refreshToken.userId = user.id;
    await this.tokenRepository.save(refreshToken);
  }
}
