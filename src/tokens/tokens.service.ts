import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './refreshToken.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly tokenRepository: Repository<RefreshToken>,

    private readonly jwtService: JwtService,
  ) {}

  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email: email,
          role: 'user',
        },
        {
          secret: process.env.PRIVATE_ACCESS_KEY || 'SECRET_ACCESS',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email: email,
          role: 'user',
        },
        {
          secret: process.env.PRIVATE_REFRESH_KEY || 'SECRET_REFRESH',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRefreshToken(userId: number, token: string) {
    const hashedToken = await bcrypt.hash(token, 10);

    const refreshToken = await this.tokenRepository.findOne({
      where: { userId },
    });

    if (!refreshToken) {
      await this.tokenRepository.save({
        userId: userId,
        refreshToken: hashedToken,
      });
    } else {
      refreshToken.refreshToken = hashedToken;
      await this.tokenRepository.save(refreshToken);
    }

    return refreshToken;
  }

  async deleteRefreshToken(userId: number) {
    return await this.tokenRepository.delete({ userId: userId });
  }

  async findRefreshTokenByUserId(userId: number) {
    return await this.tokenRepository.findOne({ where: { userId } });
  }

  // async validateRefreshToken(token: string) {

  //   const user = await this.getUserByEmail(userDto.email);

  //   if (user) {
  //     const passwordMatches = await bcrypt.compare(
  //       userDto.password,
  //       user.password,
  //     );

  //     if (passwordMatches) {
  //       return user;
  //     } else {
  //       throw new UnauthorizedException('Incorrect email or password');
  //     }
  //   } else {
  //     throw new UnauthorizedException('User not registered');
  //   }
  // }
}
