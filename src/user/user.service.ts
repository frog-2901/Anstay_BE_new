import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnauthorizedError } from 'src/response/HttpErrors';
import { ErrorCode } from 'src/response/ErrorCode';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // public async getProfile(userId: number) {
  //   const user = await this.prismaService.user.findUnique({
  //     where: { id: userId },
  //     select: {
  //       id: true,
  //       name: true,
  //       email: true,
  //       gender: true,
  //       dateOfBirth: true,
  //       role: true,
  //       avatar: true,
  //       phoneNumber: true,
  //     },
  //   });
  //   if (!user) throw new UnauthorizedError(ErrorCode.DATA_NOT_FOUND);
  //   return user;
  // }
  public async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
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
    return await this.prismaService.user.update({
      where: { id: userId },
      data: {
        avatar: avatarUrl,
      },
    });
  }
}
