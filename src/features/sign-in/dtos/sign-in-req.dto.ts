import { IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SignInReqDto {
  @ApiModelProperty({ example: 'jan@leocode.com' })
  @IsEmail()
  public email: string;

  @ApiModelProperty({ example: 'leojan' })
  @IsString()
  public password: string;
}
