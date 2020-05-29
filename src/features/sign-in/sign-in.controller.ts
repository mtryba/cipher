import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { SignInService } from './sign-in.service';
import { Errors, Routes } from '../../constants';
import { SignInReqDto, SignInResDto } from './dtos';

@ApiTags(Routes.SIGN_IN)
@Controller(Routes.SIGN_IN)
export class SignInController {
  constructor(
    private readonly signInService: SignInService,
  ) {}

  @ApiCreatedResponse({ type: SignInResDto })
  @ApiUnauthorizedResponse({ description: Errors.INVALID_CREDENTIALS })
  @Post()
  public async signIn(@Body() signInReqDto: SignInReqDto): Promise<SignInResDto> {
    return await this.signInService.signIn(signInReqDto);
  }
}
