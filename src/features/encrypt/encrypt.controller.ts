import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { EncryptService } from './encrypt.service';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { Requester } from '../../shared/decorators';
import { User } from '../users/users.interfaces';
import { Routes } from '../../config';

@ApiBasicAuth()
@ApiTags(Routes.ENCRYPT)
@Controller(Routes.ENCRYPT)
export class EncryptController {
  private fileUrl = 'http://www.africau.edu/images/default/sample.pdf';

  constructor(
    private readonly encryptService: EncryptService,
  ) {}

  @ApiCreatedResponse({
    description: `
      Format: encryptedFile_encryptedSecret_iv
      Instruction for decode base64:
      1. Decode your base64 
      2. Split string by ',' char
      3. Decode encryptedSecret with your private key
      4. Decode encryptedFile (base64) with decrypted secret and iv 
    `
  })
  @UseGuards(AuthGuard)
  @Post()
  public async getEncryptedBase64Data(@Requester() requester: User): Promise<string> {
    return await this.encryptService.getEncryptedBase64Code(requester, this.fileUrl);
  }
}
