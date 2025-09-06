import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OtpModule } from './otp/otp.module';
import { MailModule } from './mail/mail.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BlogModule } from './blog/blog.module';
import { ApartmentModule } from './apartment/apartment.module';
import { ApartmentOwnerModule } from './apartment-owner/apartment-owner.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    CloudinaryModule,
    OtpModule,
    MailModule,
    BlogModule,
    ApartmentModule,
    ApartmentOwnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
