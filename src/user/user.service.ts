import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConflictError, NotFoundError, UnauthorizedError } from 'src/response/HttpErrors';
import { ErrorCode } from 'src/response/ErrorCode';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { compareData, hashData } from 'src/libs/bcrypt/handle.password';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },select: {
        name:true,
        email: true,
        role: true,
        dateOfBirth: true,
        address:true,
        gender: true,
        phoneNumber: true,
        avatar: true,
      }
    });
    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    return user;
  }
  public async updateUserAvatar(userId: number, avatarUrl: string) {
    const user =  await this.prismaService.user.update({
      where: { id: userId },
      data: {
        avatar: avatarUrl,
      },
    });
    const {hashedPassword, role, ...result} = user 
    return result
  }
  public async update(userId: number, dto: UpdateUserDto){
    if (dto.dateOfBirth) {
    dto.dateOfBirth = new Date(dto.dateOfBirth)
    } // convert string → Date
    const newUser=  await this.prismaService.user.update({
      where: {id: userId},
      data: {...dto}
    })
    const { hashedPassword, ...result } = newUser;
    return result
  }
  public async changePassword(userId: number, dto: ChangePasswordDto){
    const user = await this.prismaService.user.findUnique({where: {id: userId}})
    if(!user) throw new NotFoundError(ErrorCode.DATA_NOT_FOUND);
    const isCorrectPassword = await compareData(dto.oldPassword, user.hashedPassword);
    if(!isCorrectPassword) throw new ConflictError(ErrorCode.PASSWORD_IS_NOT_CORRECT);
    const newHashPassword = await hashData(dto.newPassword)
    return await this.prismaService.user.update({
      where: {id: userId},
      data: {
        hashedPassword: newHashPassword
      }
    })
  }
}
