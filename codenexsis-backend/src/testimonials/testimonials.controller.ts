import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonials: TestimonialsService) {}

  @Public() @Get() findPublished() { return this.testimonials.findPublished(); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Get('all') findAll() { return this.testimonials.findAll(); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Get(':id') findOne(@Param('id') id: string) { return this.testimonials.findOne(id); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Post() create(@Body() dto: CreateTestimonialDto) { return this.testimonials.create(dto); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) { return this.testimonials.update(id, dto); }
  @ApiBearerAuth() @Roles(Role.ADMIN) @Delete(':id') remove(@Param('id') id: string) { return this.testimonials.remove(id); }
}
