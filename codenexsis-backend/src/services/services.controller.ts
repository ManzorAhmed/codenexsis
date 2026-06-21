import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly services: ServicesService) {}

  // ---------- Public (consumed by the website) ----------
  @Public()
  @Get()
  @ApiOperation({ summary: 'List published services (public)' })
  findPublished() {
    return this.services.findPublished();
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a service by slug (public)' })
  findBySlug(@Param('slug') slug: string) {
    return this.services.findBySlug(slug);
  }

  // ---------- Admin ----------
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.EDITOR)
  @Get('all')
  @ApiOperation({ summary: 'List all services incl. drafts (admin)' })
  findAll() {
    return this.services.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.EDITOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.services.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.EDITOR)
  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.services.create(dto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.EDITOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.services.update(id, dto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.services.remove(id);
  }
}
