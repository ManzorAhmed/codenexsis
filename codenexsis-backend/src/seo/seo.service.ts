import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertSeoDto } from './dto/upsert-seo.dto';

@Injectable()
export class SeoService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.seoMeta.findMany({ orderBy: { path: 'asc' } });
  }

  async findByPath(path: string) {
    const meta = await this.prisma.seoMeta.findUnique({ where: { path } });
    if (!meta) throw new NotFoundException('No SEO override for this path');
    return meta;
  }

  upsert(dto: UpsertSeoDto) {
    const { path, ...rest } = dto;
    return this.prisma.seoMeta.upsert({
      where: { path },
      create: { path, ...rest },
      update: rest,
    });
  }

  async remove(path: string) {
    await this.findByPath(path);
    await this.prisma.seoMeta.delete({ where: { path } });
    return { deleted: true };
  }
}
