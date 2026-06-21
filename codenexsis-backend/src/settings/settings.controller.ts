import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { UpsertSettingDto } from './dto/upsert-setting.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Public() @Get() findAll() { return this.settings.findAll(); }
  @Public() @Get(':key') findOne(@Param('key') key: string) { return this.settings.findOne(key); }
  @ApiBearerAuth() @Roles(Role.ADMIN, Role.EDITOR) @Put() upsert(@Body() dto: UpsertSettingDto) { return this.settings.upsert(dto); }
  @ApiBearerAuth() @Roles(Role.ADMIN) @Delete(':key') remove(@Param('key') key: string) { return this.settings.remove(key); }
}
