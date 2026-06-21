import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLeadDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() company?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() phone?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() service?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() budget?: string;
  @ApiProperty() @IsString() @MinLength(2) message: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() source?: string;
}
