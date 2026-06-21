import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertSettingDto } from './dto/upsert-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  findAll() { return this.prisma.setting.findMany({ orderBy: { key: 'asc' } }); }

  async findOne(key: string) {
    const setting = await this.prisma.setting.findUnique({ where: { key } });
    if (!setting) throw new NotFoundException('Setting not found');
    return setting;
  }

  upsert(dto: UpsertSettingDto) {
    return this.prisma.setting.upsert({
      where: { key: dto.key },
      create: { key: dto.key, value: dto.value },
      update: { value: dto.value },
    });
  }

  async remove(key: string) {
    await this.findOne(key);
    await this.prisma.setting.delete({ where: { key } });
    return { deleted: true };
  }
}
