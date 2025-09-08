import { IsEmail, IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { Role, Gender } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}