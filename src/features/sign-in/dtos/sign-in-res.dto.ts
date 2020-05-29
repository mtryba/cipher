import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SignInResDto {
  @ApiModelProperty({ description: 'Auth token' })
  public authToken: string;
}
