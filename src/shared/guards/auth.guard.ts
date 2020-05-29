import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { Errors } from '../../constants';
import { env } from '../../config';
import { JwtService } from '../services/jwt/jwt.service';
import { UsersService } from '../../features/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers && req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException(Errors.MISSING_AUTH_TOKEN);
    }

    const decodedToken = await this.jwtService.verify(token, env.AUTH_TOKEN_SECRET);
    req.requester = await this.usersService.getUserByEmail(decodedToken.email);

    return true;
  }
}
