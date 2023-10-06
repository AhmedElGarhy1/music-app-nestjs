import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthConstants } from './constants/auth-constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from './user.service';
import { ProfilesModule } from '../profiles/profiles.module';
import { EmailModule } from 'src/common/modules/email/email.module';
import { FavoritesModule } from '../favorites/favorites.module';

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
    TypeOrmModule.forFeature([User]),
    ProfilesModule,
    FavoritesModule,
    EmailModule,
  ],
  providers: [JwtStrategy, AuthService, UsersService],
  exports: [JwtStrategy, JwtModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
