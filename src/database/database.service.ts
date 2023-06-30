import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class DatabaseService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async saveUser(newUser: User): Promise<User> {
        return this.userRepository.save(newUser);
    }

    async findUserByEmail (email: string): Promise<User> {
        const user = this.userRepository.findOne({ where: { email } });
        return user;
    }
}
