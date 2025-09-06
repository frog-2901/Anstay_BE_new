import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApartmentOwnerService {
    constructor(private readonly prismaService: PrismaService){}
    public async create(dto){
        return await this.prismaService.apartmentOwner.create({
            data: {...dto}
        })
    }
}
