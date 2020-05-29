import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class GenerateKeyPairResDto {
  @ApiModelProperty({ description: 'Public key of user', example: '-----BEGIN PUBLIC KEY-----' })
  public pubKey: string;

  @ApiModelProperty({ description: 'Private key of user', example: '-----BEGIN ENCRYPTED PRIVATE KEY-----' })
  public privKey: string;
}
