import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}

  async registration(email: string, password: string, phone_number: string) {
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

      return this.databaseService.saveUser(newUser);
    } catch (e) {
      console.log(e);
    }
  }
}
