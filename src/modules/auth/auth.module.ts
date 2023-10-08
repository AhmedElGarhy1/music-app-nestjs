import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthConstants } from './constants/auth-constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ProfilesModule } from '../profiles/profiles.module';
import { EmailModule } from 'src/common/modules/email/email.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { UsersModule } from '../users/users.module';

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
    UsersModule,
    ProfilesModule,
    FavoritesModule,
    EmailModule,
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy, JwtModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
