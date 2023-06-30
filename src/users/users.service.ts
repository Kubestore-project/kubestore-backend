import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registration(email: string, password: string, phone_number: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (user) {
        // throw new error
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User();
      newUser.email = email;
      newUser.password = hashedPassword;
      newUser.phone_number = phone_number;
      newUser.role = UserRole.USER;

      return this.userRepository.save(newUser);
    } catch (e) {
      console.log(e);
    }
  }
}
