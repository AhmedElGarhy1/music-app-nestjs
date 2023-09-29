import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
