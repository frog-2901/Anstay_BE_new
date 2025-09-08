import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-by-email.dto';
import { AuthGuard } from './auth.guard';
import {
  RequestUser,
  User,
} from 'src/common/decorators/request.user.decorator';
import { StandardResponse } from 'src/response/StandardResponse';
import { AppMessage } from 'src/response/AppMessage';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() dto: RegisterDto) {
    const data = await this.authService.register(dto);
    const response: StandardResponse = {
      success: true,
      code: HttpStatus.CREATED,
      message: AppMessage.REGISTER_SUCCESS,
      data,
    };
    return response;
  }
  @Post('login')
  public async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    const response: StandardResponse = {
      success: true,
      code: HttpStatus.OK,
      message: AppMessage.LOGIN_SUCCESS,
      data,
    };
    return response;
  }
  @UseGuards(AuthGuard)
  @Post('logout')
  public async logout(@User() user:RequestUser){
    return await this.authService.logout(user.id);
  }
}
