import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'userPassword', description: 'User password' })
  readonly password: string;
}
