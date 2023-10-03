import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthConstants } from './constants/auth-constants';
import { JwtModule } from '@nestjs/jwt';
import { EmailVerification } from './entities/email-verification.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from './user.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: AuthConstants.strategy,
    }),
    JwtModule.register({
      secret: AuthConstants.secretKey,
      signOptions: {
        expiresIn: AuthConstants.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([User, EmailVerification]),
  ],
  providers: [JwtStrategy, AuthService, UsersService],
  exports: [JwtStrategy, JwtModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
