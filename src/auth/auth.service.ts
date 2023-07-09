import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokensService,
  ) {}

  async register(dto: RegisterDto): Promise<Tokens> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });

    const tokens = await this.tokenService.getTokens(user.id, user.email);
    await this.tokenService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async login(dto: LoginDto): Promise<Tokens> {
    const user = await this.userService.validateUser(dto);
    const tokens = await this.tokenService.getTokens(user.id, user.email);
    await this.tokenService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    return await this.tokenService.deleteRefreshToken(userId);
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.userService.getUserById(userId);

    const refreshToken = await this.tokenService.findRefreshTokenByUserId(
      userId,
    );

    if (!refreshToken)
      throw new UnauthorizedException('refreshToken not registered'); // TODO: Think about error

    const rtMatches = await bcrypt.compare(rt, refreshToken.refreshToken);

    if (!rtMatches)
      throw new UnauthorizedException('refreshToken not registered'); // TODO: Think about error

    const tokens = await this.tokenService.getTokens(user.id, user.email);
    await this.tokenService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
