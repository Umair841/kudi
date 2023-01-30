import { IsEmail, IsString, IsArray, IsOptional } from 'class-validator';

export class ForgotPasswordDto {
  @IsString()
  public phoneNumber: string;
}

export class CreateUserDto {
  @IsString()
  @IsOptional()
  civility: string;

  @IsString()
  @IsOptional()
  public firstName: string;

  @IsString()
  @IsOptional()
  public lastName: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  public phoneNumber: string;

  @IsString()
  public password: string;

  @IsString()
  @IsOptional()
  public birthdate: string;

  @IsString()
  @IsOptional()
  public birthplace: string;

  @IsArray()
  @IsOptional()
  public roles: string[];
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  civility: string;

  @IsString()
  @IsOptional()
  public firstName: string;

  @IsString()
  @IsOptional()
  public lastName: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public phoneNumber: string;

  @IsString()
  @IsOptional()
  public birthdate: string;

  @IsString()
  @IsOptional()
  public birthplace: string;

  @IsArray()
  @IsOptional()
  public roles: string[];
}
