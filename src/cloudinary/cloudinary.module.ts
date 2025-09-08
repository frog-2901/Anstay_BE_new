import { Module } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryController } from "./cloudinary.controller";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService, UserService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
