import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  findPublished() {
    return this.prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  }
  findAll() { return this.prisma.testimonial.findMany({ orderBy: { order: 'asc' } }); }

  async findOne(id: string) {
    const t = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!t) throw new NotFoundException('Testimonial not found');
    return t;
  }
  create(dto: CreateTestimonialDto) { return this.prisma.testimonial.create({ data: dto }); }
  async update(id: string, dto: UpdateTestimonialDto) {
    await this.findOne(id);
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }
  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.testimonial.delete({ where: { id } });
    return { deleted: true };
  }
}
