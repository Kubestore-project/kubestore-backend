import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty() // TODO: add the comment
  @IsString() // TODO: add the comment
  @IsEmail() // TODO: add the comment
  email: string;

  @IsNotEmpty() // TODO: add the comment
  @IsString() // TODO: add the comment
  @Length(8, 16) // TODO: add the comment
  password: string;
}
