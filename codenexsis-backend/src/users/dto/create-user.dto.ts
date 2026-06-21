import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ minLength: 6 }) @IsString() @MinLength(6) password: string;
  @ApiProperty({ enum: Role, required: false }) @IsOptional() @IsEnum(Role) role?: Role;
  @ApiProperty({ required: false }) @IsOptional() @IsBoolean() active?: boolean;
}
