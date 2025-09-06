import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Post("create")
  public async create(@Body() dto: CreateBlogDto){
    return this.blogService.create(dto)
  }
  @Get("")
  public async getAll(){
    return this.blogService.findAll()
  }
}
