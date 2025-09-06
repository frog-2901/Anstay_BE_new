import { Body, Controller, Post } from '@nestjs/common';
import { ApartmentOwnerService } from './apartment-owner.service';
import { ApartmentOwnerDto } from './dto/create-apartment-owner.dto';



@Controller('apartment-owner')
export class ApartmentOwnerController {
  constructor(private readonly apartmentOwnerService: ApartmentOwnerService) {}
  @Post("create")
  public async create(@Body() dto: ApartmentOwnerDto){
    return await this.apartmentOwnerService.create(dto)
  }
}
