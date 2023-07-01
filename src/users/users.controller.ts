import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegistrationUserDto } from './registrationUserDto';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('registration')
  @UsePipes(ValidationPipe)
  async registration(@Body() registrationUserDto: RegistrationUserDto) {
    const { email, phone_number, password } = registrationUserDto;

    return await this.userService.registration(email, password, phone_number);
  }
}
