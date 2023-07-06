import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly tokenService: TokensService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    // const accessToken = await this.tokenService.generateAccessToken(user);
    // const refreshToken = await this.tokenService.generateRefreshToken(user);
    // await this.tokenService.saveRefreshToken(refreshToken, user);

    // return {
    //   accessToken: accessToken,
    //   refreshToken: refreshToken,
    // };
    return user;
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    const accessToken = await this.tokenService.generateAccessToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);
    await this.tokenService.saveRefreshToken(refreshToken, user);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (user) {
      const passwordMatches = await bcrypt.compare(
        userDto.password,
        user.password,
      );

      if (passwordMatches) {
        return user;
      } else {
        throw new UnauthorizedException('Incorrect email or password');
      }
    } else {
      throw new UnauthorizedException('User not registered');
    }
  }
}
