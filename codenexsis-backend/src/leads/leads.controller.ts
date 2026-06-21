import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  /** Public contact-form endpoint (rate-limited to deter spam). */
  @Public()
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @Post()
  @ApiOperation({ summary: 'Submit the contact form (public)' })
  create(@Body() dto: CreateLeadDto) {
    return this.leads.create(dto);
  }

  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Get() findAll() { return this.leads.findAll(); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Get('stats') stats() { return this.leads.stats(); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Get(':id') findOne(@Param('id') id: string) { return this.leads.findOne(id); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateLeadDto) { return this.leads.update(id, dto); }
  @ApiBearerAuth() @Roles(Role.ADMIN) @Delete(':id') remove(@Param('id') id: string) { return this.leads.remove(id); }
}
