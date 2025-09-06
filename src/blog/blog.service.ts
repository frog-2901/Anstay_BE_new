import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlogStatus } from '@prisma/client';
import { CreateBlogDto } from './dto/create-blog.dto';


@Injectable()
export class BlogService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateBlogDto) {
    return this.prismaService.blogPost.create({
      data,
    });
  }

  async findAll() {
    return this.prismaService.blogPost.findMany({
        where: {status: BlogStatus.PUBLISHED}
    });
  }

  async findById(id: number) {
    return this.prismaService.blogPost.findUnique({
      where: { id },
    });
  }

//   async findBySlug(slug: string) {
//     return this.prismaService.blogPost.findUnique({
//       where: { slug },
//     });
//   }

//   async findByStatus(status: BlogStatus) {
//     return this.prisma.blogPost.findMany({
//       where: { status },
//     });
//   }

//   async findByUser(userId: number) {
//     return this.prisma.blogPost.findMany({
//       where: { createdBy },
//     });
//   }

//   async deleteById(id: number) {
//     return this.prisma.blogPost.delete({
//       where: { id },
//     });
//   }

//   async update(id: number, data: UpdateBlogPostDto) {
//     return this.prisma.blogPost.update({
//       where: { id },
//       data,
//     });
//   }
}