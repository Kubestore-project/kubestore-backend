import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async getTokens(
    userId: number,
    email: string,
    role: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email: email,
          role: role,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email: email,
          role: role,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async registration(
    email: string,
    password: string,
    phone_number: string,
  ): Promise<Tokens> {
    try {
      const user = await this.databaseService.findUserByEmail(email);

      if (user) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User();
      newUser.email = email;
      newUser.password = hashedPassword;
      newUser.phone_number = phone_number;
      newUser.role = UserRole.USER;
      newUser.refreshToken = '';

      const tokens = await this.getTokens(
        newUser.id,
        newUser.email,
        newUser.role,
      );

      this.databaseService.saveUser(newUser);

      // await this.updateRtHash(newUser.id, newUser.);

      return tokens;
    } catch (e) {
      console.log(e);
    }
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await bcrypt.hash(rt, 12);
  }
}
