import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import type { Express } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  RequestUser,
  User,
} from 'src/common/decorators/request.user.decorator';
import { UserService } from 'src/user/user.service';
import { StandardResponse } from 'src/response/StandardResponse';
import { AppMessage } from 'src/response/AppMessage';
@Controller('upload')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @User() user: RequestUser,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|png|jpg|webp)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const uploadResult = await this.cloudinaryService.uploadFile(
      file.buffer,
      file.originalname,
      user.name,
    );
    await this.userService.updateUserAvatar(user.id, uploadResult.secure_url);
    const response: StandardResponse = {
      success: true,
      code: HttpStatus.OK,
      message: AppMessage.UPLOADED_SUCCESSFULLY,
    };
    return response;
  }
}
