import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { PROJECT_STATUS } from '../interfaces/project.interface';

export class ProjectMediaDto {
  @IsString()
  @IsOptional()
  public url?: string;
}

export class ProjectsDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  small_description: string;

  @IsString()
  @IsOptional()
  long_description: string;

  @IsString()
  @IsOptional()
  story: string;

  @IsString()
  @IsOptional()
  desired_amount: number;

  @IsString()
  @IsOptional()
  raised_amount: number;

  @IsString()
  @IsOptional()
  published_date: number;

  @IsEnum(PROJECT_STATUS)
  @IsOptional()
  status: PROJECT_STATUS;

  @IsString()
  @IsOptional()
  publisherId: string;

  @IsString()
  @IsOptional()
  rate: number;

  @IsArray()
  @IsOptional()
  images: ProjectMediaDto[];

  @IsArray()
  @IsOptional()
  videos: ProjectMediaDto[];
}
