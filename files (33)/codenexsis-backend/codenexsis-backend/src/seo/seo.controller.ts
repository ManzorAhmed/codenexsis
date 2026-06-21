import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SeoService } from './seo.service';
import { UpsertSeoDto } from './dto/upsert-seo.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('seo')
@Controller('seo')
export class SeoController {
  constructor(private readonly seo: SeoService) {}

  @Public()
  @Get()
  findAll() {
    return this.seo.findAll();
  }

  @Public()
  @Get('by-path')
  @ApiQuery({ name: 'path', example: '/services' })
  findByPath(@Query('path') path: string) {
    return this.seo.findByPath(path);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.EDITOR)
  @Put()
  upsert(@Body() dto: UpsertSeoDto) {
    return this.seo.upsert(dto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Delete()
  @ApiQuery({ name: 'path', example: '/services' })
  remove(@Query('path') path: string) {
    return this.seo.remove(path);
  }
}
