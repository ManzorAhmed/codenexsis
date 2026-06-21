import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsInt, IsOptional, IsString, MinLength,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty() @IsString() @MinLength(2) slug: string;
  @ApiProperty() @IsString() number: string;
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() shortTitle: string;
  @ApiProperty({ description: 'build | secure | scale | market' }) @IsString() category: string;
  @ApiProperty({ description: 'marketing sub-group: seo | paid | social | analytics', required: false }) @IsOptional() @IsString() group?: string;
  @ApiProperty() @IsString() tagline: string;
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsString() longDescription: string;
  @ApiProperty({ description: 'lucide-react icon name, e.g. BrainCircuit' }) @IsString() icon: string;
  @ApiProperty({ type: [String] }) @IsArray() @IsString({ each: true }) capabilities: string[];
  @ApiProperty({ type: [String] }) @IsArray() @IsString({ each: true }) technologies: string[];
  @ApiProperty({ type: [String] }) @IsArray() @IsString({ each: true }) deliverables: string[];
  @ApiProperty() @IsString() metaTitle: string;
  @ApiProperty() @IsString() metaDescription: string;
  @ApiProperty({ type: [String], required: false }) @IsOptional() @IsArray() @IsString({ each: true }) keywords?: string[];
  @ApiProperty({ required: false }) @IsOptional() @IsBoolean() published?: boolean;
  @ApiProperty({ required: false }) @IsOptional() @IsInt() order?: number;
}
