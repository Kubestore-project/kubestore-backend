import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegistrationUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  readonly phone_number: string;

  @IsString()
  @MinLength(6)
  password: string;
}
