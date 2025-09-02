import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      issuer: 'devblog-api',
      audience: 'devblog-users',
    });
  }

  async validate(payload: any) {
    try {
      // Validate user exists in database
      const user = await this.authService.validateUser(payload.sub);
      
      return {
        id: user.id,
        username: user.username,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
