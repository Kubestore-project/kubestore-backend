import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'userPassword', description: 'User password' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 16, {
    message:
      'The password must be at least 8 and no more than 16 characters long',
  })
  readonly password: string;

  @ApiProperty({ example: '+380969022268', description: 'User phone number' })
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  @IsString({ message: 'Phone number must be a string' })
  readonly phoneNumber: string;
}
