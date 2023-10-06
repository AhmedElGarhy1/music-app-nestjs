import { RolesGuard } from './../../common/guards/roles.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { EmailService } from 'src/common/modules/email/email.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

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

  @Get('email/verify/:token')
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Get('email/forget-password/:email')
  async forgetPassword(@Param('email') email: string) {
    return this.authService.sendForgettenPasswordEmail(email);
  }

  @Post('email/reset-password')
  async resetPassword(@Body() data: ForgetPasswordDto) {
    return this.authService.resetPassword(data);
  }

  @Get('email/test/:email')
  async testEmailService(@Param('email') email: string) {
    return this.authService.sentTempEmail(email);
  }

  // @Get('user-endpoint')
  // @UseGuards(AuthGuard(), RolesGuard)
  // @Roles(RoleEnum.USER)
  // async userAccess() {
  //   return 'have access to this endpoint';
  // }

  // @Get('admin-endpoint')
  // @UseGuards(AuthGuard(), RolesGuard)
  // @Roles(RoleEnum.ADMIN)
  // async adminAccess() {
  //   return 'have access to this endpoint';
  // }

  // @Get('protected-endpoint')
  // @UseGuards(AuthGuard())
  // async protectedAccess() {
  //   return 'have access to this endpoint';
  // }
}
