import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApartmentDto } from './dto/create-apartment-dto';
import { ApartmentArea } from '@prisma/client';

@Injectable()
export class ApartmentService {
    constructor(private readonly prismaService: PrismaService){}
    
    public async create(dto: CreateApartmentDto){
        return await this.prismaService.apartment.create({
            data: {...dto}
        })
    }
    public async getByArea(area: ApartmentArea){
        return await this.prismaService.apartment.findMany({
            where: {area},
            include: {
                owner: true,
                images: true
            }
        })
    }

}
