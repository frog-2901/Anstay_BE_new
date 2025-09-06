import { ApartmentArea, ApartmentStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  ownerId?: number;

  @IsNumber()
  @IsOptional()
  pricePerDay?: number;

  @IsNumber()
  @IsOptional()
  pricePerMonth?: number;

  @IsNumber()
  @IsOptional()
  discountPercent?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  maxAdults?: number;

  @IsNumber()
  @IsOptional()
  maxChildren?: number;

  @IsNumber()
  @IsOptional()
  numRooms?: number;

  @IsEnum(ApartmentStatus)
  @IsOptional()
  status?: ApartmentStatus;

  @IsEnum(ApartmentArea)
  @IsOptional()
  area?: ApartmentArea;

  @IsNumber()
  @IsOptional()
  maxBed?: number;

  @IsNumber()
  @IsOptional()
  acreage?: number;

  @IsString()
  @IsOptional()
  nameApartment?: string;
}
