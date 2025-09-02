import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const getJwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: {
    expiresIn: configService.get<string>('JWT_EXPIRES_IN', '24h'),
    issuer: 'devblog-api',
    audience: 'devblog-users',
  },
  verifyOptions: {
    issuer: 'devblog-api',
    audience: 'devblog-users',
  },
});

// JWT Strategy configuration
export const getJwtStrategyConfig = (configService: ConfigService) => ({
  secretOrKey: configService.get<string>('JWT_SECRET'),
  jwtFromRequest: (req: any) => {
    // Extract JWT from Authorization header
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      return token;
    }
    // Extract JWT from cookies (alternative method)
    if (req.cookies && req.cookies.jwt) {
      return req.cookies.jwt;
    }
    return null;
  },
  ignoreExpiration: false,
  issuer: 'devblog-api',
  audience: 'devblog-users',
});
