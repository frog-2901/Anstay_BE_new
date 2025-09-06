import { Injectable } from "@nestjs/common";
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { Readable } from "stream";
@Injectable()
export class CloudinaryService {
  constructor(private readonly prismaService: PrismaService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  async uploadFile(fileBuffer: Buffer, originalName: string, userName: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `${userName}/${originalName}`,
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Upload failed"));
          return resolve(result);
        }
      );

      Readable.from(fileBuffer).pipe(stream);
    });
  }
}
