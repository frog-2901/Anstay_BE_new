import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { RequestOtpDto } from "./dto/requestOtp.dto";
import { StandardResponse } from "src/response/StandardResponse";
import { AppMessage } from "src/response/AppMessage";

@Controller("otp")
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post("request")
  public async requestOtp(@Body() dto: RequestOtpDto) {
    const data = await this.otpService.requestOtp(dto);
    const respose: StandardResponse = {
      success: true,
      code: HttpStatus.CREATED,
      message: AppMessage.OTP_REQUESTED_SUCCESSFULLY,
      data,
    };
    return respose;
  }

  @Post("verify")
  public async verifyOtp(@Body() dto: { email: string; otp: string }) {
    const data = await this.otpService.verifyOtp(dto.email, dto.otp);
    const response: StandardResponse = {
      success: true,
      code: HttpStatus.OK,
      message: AppMessage.OTP_VERIFIED_SUCCESSFULLY,
      data,
    };
    return response;
  }
}
