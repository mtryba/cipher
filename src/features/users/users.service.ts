import { Injectable, NotFoundException } from '@nestjs/common';

import { Errors } from '../../constants';
import { User } from './users.interfaces';
import { UsersUpdateDto } from './dtos/users-update.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { email: 'kasia@leocode.com', password: '$2b$12$YMgwBVLnXmEbXSJ7PhFFGOBB.ss8fEt7/PKFR/KBFtiX1FNQatGgO' },
    { email: 'jan@leocode.com', password: '$2b$12$eu2ucmdsQrY6J8H2grUdaO0lhzDsjk7erbg.tPgmesx0Al5aJKbsy' },
  ];

  public getUserByEmail(email: string): User {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      throw new NotFoundException(Errors.USER_NOT_FOUND);
    }

    return user;
  }

  public updateUserByEmail(email: string, data: UsersUpdateDto) {
    const userIndex = this.users.findIndex(user => user.email === email);

    if (userIndex < 0) {
      throw new NotFoundException(Errors.USER_NOT_FOUND);
    }

    const userData: User = { ...this.users[userIndex], ...data };
    this.users[userIndex] = { ...userData };

    return userData;
  }
}
