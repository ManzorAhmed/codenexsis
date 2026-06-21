import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blog: BlogService) {}

  @Public() @Get() findPublished() { return this.blog.findPublished(); }
  @Public() @Get('slug/:slug') findBySlug(@Param('slug') slug: string) { return this.blog.findBySlug(slug); }

  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Get('all') findAll() { return this.blog.findAll(); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Get(':id') findOne(@Param('id') id: string) { return this.blog.findOne(id); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Post() create(@Body() dto: CreatePostDto) { return this.blog.create(dto); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdatePostDto) { return this.blog.update(id, dto); }
  @ApiBearerAuth() @Roles(Role.ADMIN) @Delete(':id') remove(@Param('id') id: string) { return this.blog.remove(id); }
}
