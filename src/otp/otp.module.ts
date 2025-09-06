import { Module } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { OtpController } from "./otp.controller";
import { MailModule } from "src/mail/mail.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [MailModule, PrismaModule],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
