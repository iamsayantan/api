import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TokenExpiredException } from '../core/external/sso/sso.exceptions';
import { HttpInvalidTokenException } from './invalidToken.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authenticationService: AuthenticationService) {
  }

  resolve(): (req, res, next) => void {
    return async (req, res, next) => {
      // If no headers continue
      if (!req.headers['authorization']) return next();

      // Else, we validate provided token
      try {
        const token = req.headers['authorization'].slice('Bearer '.length);
        req.token = token;
        req.character = await this.authenticationService.verifyAuthentication(token);
      } catch (error) {
        if (error instanceof TokenExpiredException) {
          // we continue with execution
          req.character = null;
          return next();
        }
        // If some other error, re-throw
        throw error;
      }

      next();
    };
  }
}