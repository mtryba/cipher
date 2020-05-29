import { IsEmail, IsString } from 'class-validator';

export class UsersUpdateDto {
  @IsEmail()
  public email?: string;

  @IsString()
  public password?: string;

  @IsString()
  public pubKey?: string;
}
