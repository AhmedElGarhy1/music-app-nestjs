import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthConstants } from '../constants/auth-constants';
import { IJwtPayload } from '../interfaces/i-jwt-payload.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthConstants.secretKey,
    });
  }

  async validate({ email }: IJwtPayload) {
    const user = await this.authService.findByEmail(email);

    if (!user) throw new UnauthorizedException('User un Authorized');
  }
}
