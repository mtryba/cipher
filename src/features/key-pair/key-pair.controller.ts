import { Controller, Post, UseGuards } from '@nestjs/common';

import { Errors, Routes } from '../../config';
import { KeyPairService } from './key-pair.service';
import { Requester } from '../../shared/decorators';
import { User } from '../users/users.interfaces';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { UsersService } from '../users/users.service';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GenerateKeyPairResDto } from './dtos';

@ApiBasicAuth()
@ApiTags(Routes.GENERATE_KEY_PAIR)
@Controller(Routes.GENERATE_KEY_PAIR)
export class KeyPairController {
  constructor(
    private readonly keyPairService: KeyPairService,
    private readonly usersService: UsersService,
  ) {}

  @ApiCreatedResponse({ type: GenerateKeyPairResDto })
  @ApiUnauthorizedResponse({ description: Errors.INCORRECT_AUTH_TOKEN_OR_EXPIRED })
  @ApiBadRequestResponse({ description: Errors.UNABLE_TO_GENERATE_KEY_PAIR })
  @UseGuards(AuthGuard)
  @Post()
  public async generateKeyPair(@Requester() requester: User) {
    const keyPair = await this.keyPairService.generateKeyPair();
    await this.usersService.updateUserByEmail(requester.email, { pubKey: keyPair.pubKey });

    return keyPair;
  }
}
