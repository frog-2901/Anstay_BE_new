import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';
import { RequestOtpDto } from './dto/requestOtp.dto';
import { BadRequestError } from 'src/response/HttpErrors';
import { ErrorCode } from 'src/response/ErrorCode';
import { MailService } from 'src/mail/mail.service';
import { compareData, hashData } from 'src/libs/bcrypt/handle.password';
@Injectable()
export class OtpService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  public async generateOtp(): Promise<string> {
    return crypto.randomInt(100000, 999999).toString();
  }
  public async requestOtp(dto: RequestOtpDto) {
    const otp = await this.generateOtp();
    console.log('otp: ', otp);
    const expiresAt = new Date(Date.now() + 60 * 1000);
    const res = await this.prismaService.otp.create({
      data: {
        otp: await hashData(otp),
        email: dto.email,
        expiresAt,
        verified: false,
        atttempts: 0,
      },
      select: {
        email: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    await this.mailService.sendOtpEmail(dto.email, otp);
    return res;
  }
  public async verifyOtp(email: string, otp: string) {
    const otpRecord = await this.prismaService.otp.findFirst({
      where: { email, verified: false },
      orderBy: { createdAt: 'desc' },
    });
    if (!otpRecord) throw new BadRequestError(ErrorCode.OTP_NOT_SENT);
    const isOtpMatched = await compareData(otp, otpRecord.otp);
    if (!isOtpMatched) throw new BadRequestError(ErrorCode.INCORRECT_OTP_CODE);
    if (otpRecord.expiresAt < new Date())
      throw new BadRequestError(ErrorCode.OTP_IS_EXPIRED);
    const res = await this.prismaService.otp.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });
    return true;
  }
}
