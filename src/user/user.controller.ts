import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  RequestUser,
  User,
} from 'src/common/decorators/request.user.decorator';
import { StandardResponse } from 'src/response/StandardResponse';
import { AppMessage } from 'src/response/AppMessage';
import {  UnauthorizedError } from 'src/response/HttpErrors';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Get(':id')
  public async getUserById(@Param('id', ParseIntPipe) id) {
    const data = await this.userService.getUserById(id);
    const response :StandardResponse = {
      success:true,
      code: HttpStatus.OK,
      data,
      message: AppMessage.SUCCESS_RESPONSE
    }
    return response
  }
  @Put(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto){
    const data = await this.userService.update(id,dto)
    const response :StandardResponse = {
      success: true,
      message: AppMessage.UPDATED_SUCCESSFULLY,
      data,
      code: HttpStatus.OK
    }
    return response
  }
  @UseInterceptors(FileInterceptor('file'))
  @Post('/:id/avatar')
  public async uploadFile(
    @Param('id', ParseIntPipe) id: number,
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
  const user = await this.userService.getUserById(id);
  const uploadResult = await this.cloudinaryService.uploadFile(
    file.buffer,
    file.originalname,
    user?.name,
  );
  const data = await this.userService.updateUserAvatar(
    id,
    uploadResult.secure_url,
  );

  return {
    success: true,
    code: HttpStatus.OK,
    data,
    message: AppMessage.UPLOADED_SUCCESSFULLY,
  };
  }
  @Put("/:id/change-password")
  public async changePassword(@Param("id", ParseIntPipe) id: number, @Body() dto: ChangePasswordDto){
    const data = await this.userService.changePassword(id, dto);
    const response: StandardResponse= {
      message: AppMessage.PASSWORD_CHANGED_SUCCESS,
      code: HttpStatus.OK,
      success:true
    }
    return response
  }
}
