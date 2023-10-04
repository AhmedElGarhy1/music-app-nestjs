import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAll() {
    console.log('get all');
    return 'all users';
  }

  @Post('register')
  signup(@Body() data: RegisterUserDto) {
    const user = this.authService.signup(data);
    return user;
  }

  @Post('login')
  signin(@Body() data: SigninUserDto) {
    const user = this.authService.signin(data);
    return user;
  }

  @Post('reset-password')
  async resetPassword() {
    // const user = this.authService.resetPassword(data);
    // return user;
  }

  @Post('email/verify/:token')
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}
