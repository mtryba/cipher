import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '../../shared/services/jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { HashService } from '../../shared/services/hash-service/hash.service';
import { Errors, env } from '../../config';
import { SignInReqDto, SignInResDto } from './dtos';

@Injectable()
export class SignInService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  public async signIn(signInReqDto: SignInReqDto): Promise<SignInResDto> {
    try {
      const { email, password } = signInReqDto;
      const { AUTH_TOKEN_SECRET, TOKEN_EXPIRATION } = env;

      const user = this.usersService.getUserByEmail(email);
      const matchedPassword = await this.hashService.compareHash(password, user.password);

      if (!matchedPassword) {
        throw new UnauthorizedException(Errors.INVALID_CREDENTIALS);
      }

      const expiresIn = Number(TOKEN_EXPIRATION) * 60;
      const authToken = await this.jwtService.sign({ email }, AUTH_TOKEN_SECRET, { expiresIn });
      return { authToken };
    } catch (err) {
      throw new UnauthorizedException(Errors.INVALID_CREDENTIALS);
    }
  }
}
