import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsInt, IsOptional, IsString, MinLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty() @IsString() @MinLength(2) slug: string;
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() excerpt: string;
  @ApiProperty({ description: 'Markdown or HTML body' }) @IsString() content: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() coverImage?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() author?: string;
  @ApiProperty({ type: [String], required: false }) @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @ApiProperty({ required: false }) @IsOptional() @IsString() metaTitle?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() metaDescription?: string;
  @ApiProperty({ type: [String], required: false }) @IsOptional() @IsArray() @IsString({ each: true }) keywords?: string[];
  @ApiProperty({ required: false }) @IsOptional() @IsBoolean() published?: boolean;
  @ApiProperty({ required: false }) @IsOptional() @IsInt() readingMinutes?: number;
}
