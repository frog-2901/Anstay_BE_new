import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  public async sendOtpEmail(to: string, code: string) {
    const subject = `Mã OTP xác thực của bạn`;
    const html = `<p>Xin chào,</p>
      <p>Mã OTP của bạn là: <strong>${code}</strong></p>
      <p>Mã có hiệu lực trong 1 phút.</p>`;
    await this.transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html,
    });
  }
}
