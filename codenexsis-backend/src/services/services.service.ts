import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  /** Public list — only published, ordered. */
  findPublished() {
    return this.prisma.service.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { number: 'asc' }],
    });
  }

  /** Admin list — everything. */
  findAll() {
    return this.prisma.service.findMany({ orderBy: [{ order: 'asc' }, { number: 'asc' }] });
  }

  async findBySlug(slug: string) {
    const svc = await this.prisma.service.findUnique({ where: { slug } });
    if (!svc) throw new NotFoundException('Service not found');
    return svc;
  }

  async findOne(id: string) {
    const svc = await this.prisma.service.findUnique({ where: { id } });
    if (!svc) throw new NotFoundException('Service not found');
    return svc;
  }

  async create(dto: CreateServiceDto) {
    try {
      return await this.prisma.service.create({ data: dto });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('A service with that slug already exists');
      }
      throw e;
    }
  }

  async update(id: string, dto: UpdateServiceDto) {
    await this.findOne(id);
    return this.prisma.service.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.service.delete({ where: { id } });
    return { deleted: true };
  }
}
