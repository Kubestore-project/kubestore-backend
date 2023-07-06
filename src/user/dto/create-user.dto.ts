import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @IsString({ message: 'This field should be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'userPassword', description: 'User password' })
  @IsString({ message: 'This field should be a string' })
  @Length(8, 16, {
    message: 'The password should contain from 8 to 16 characters',
  })
  readonly password: string;

  @ApiProperty({ example: '+380969022285', description: 'User mobile phone' })
  @IsString({ message: 'This field should be a string' })
  readonly phoneNumber: string;
}
