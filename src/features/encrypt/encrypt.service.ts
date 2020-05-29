import * as http from 'http';
import * as crypto from 'crypto';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Errors } from '../../config';
import { User } from '../users/users.interfaces';

@Injectable()
export class EncryptService {

  public async getEncryptedBase64Code(user: User, fileUrl: string) {
    if (!user.pubKey) {
      throw new BadRequestException(Errors.MISSING_PUBLIC_KEY);
    }

    const file = await this.downloadFile(fileUrl);
    const algorithm = 'aes-128-cbc';
    const secret = crypto.randomBytes(16);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secret, iv);
    let encryptedFile = cipher.update(file, 'binary', 'base64');
    encryptedFile += cipher.final('base64');

    const encryptedSecret = crypto.publicEncrypt(user.pubKey, secret);
    const result = `${encryptedFile},${encryptedSecret},${iv}`;

    return Buffer.from(result).toString('base64')
  }

  private downloadFile(fileUrl: string): Promise<string> {
    try {
      return new Promise((resolve, reject) => {
        let file;
        http.get(fileUrl, response => {
          response
            .on('data', data => {
              file += data;
            })
            .on('end', () => {
              resolve(file)
            })
            .on('error', err => {
              reject(err);
            });
        });
      })
    } catch (err) {
      throw new BadRequestException(Errors.UNABLE_TO_DOWNLOAD_FILE);
    }
  }
}
