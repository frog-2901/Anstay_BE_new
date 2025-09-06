import { Module } from '@nestjs/common';
import { ApartmentOwnerService } from './apartment-owner.service';
import { ApartmentOwnerController } from './apartment-owner.controller';

@Module({
  controllers: [ApartmentOwnerController],
  providers: [ApartmentOwnerService],
})
export class ApartmentOwnerModule {}
