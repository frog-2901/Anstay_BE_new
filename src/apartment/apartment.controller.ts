import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment-dto';
import { ApartmentArea } from '@prisma/client';

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}
  @Post("create")
  public async create(@Body() dto: CreateApartmentDto) {
    return await this.apartmentService.create(dto);
  }
  @Get("by-area")
  public async getApartmentsByArea(@Query('area') area:ApartmentArea ){
    return await this.apartmentService.getByArea(area)
  }
}
