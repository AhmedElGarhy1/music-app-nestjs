import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  signup(@Body() data: CreateUserDto) {}

  @Post('login')
  signin(@Body() data: AuthDto) {}
}
