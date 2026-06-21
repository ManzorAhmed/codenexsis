import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpsertSeoDto {
  @ApiProperty({ example: '/services' }) @IsString() path: string;
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() description: string;
  @ApiProperty({ type: [String], required: false }) @IsOptional() @IsArray() @IsString({ each: true }) keywords?: string[];
  @ApiProperty({ required: false }) @IsOptional() @IsString() ogImage?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() canonical?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsBoolean() noindex?: boolean;
}
