import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post } from '@nestjs/common';
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
  @Get("/:id")
  public async getById(@Param("id", ParseIntPipe) id: number){
    return this.blogService.findById(id);
  }
}
