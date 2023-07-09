import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterDto } from 'src/auth/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: RegisterDto) {
    return await this.userRepository.save(dto);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async validateUser(userDto: LoginDto) {
    const user = await this.getUserByEmail(userDto.email);

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
