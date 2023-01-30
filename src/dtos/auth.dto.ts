import { IsString, MaxLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MaxLength(15)
  public phoneNumber: string;

  @IsString()
  public password: string;
}
