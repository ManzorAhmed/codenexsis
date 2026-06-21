import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty() @IsString() author: string;
  @ApiProperty() @IsString() role: string;
  @ApiProperty() @IsString() company: string;
  @ApiProperty() @IsString() quote: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() avatar?: string;
  @ApiProperty({ required: false, minimum: 1, maximum: 5 }) @IsOptional() @IsInt() @Min(1) @Max(5) rating?: number;
  @ApiProperty({ required: false }) @IsOptional() @IsBoolean() published?: boolean;
  @ApiProperty({ required: false }) @IsOptional() @IsInt() order?: number;
}
