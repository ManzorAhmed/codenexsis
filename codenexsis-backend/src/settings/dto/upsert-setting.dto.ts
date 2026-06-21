import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString } from 'class-validator';

export class UpsertSettingDto {
  @ApiProperty({ example: 'contact' })
  @IsString()
  key!: string;

  @ApiProperty({
    description: 'Arbitrary JSON value',
    example: { email: 'info@codenexsis.com', phone: '+971 50 000 0000' },
  })
  @Allow()
  value!: any;
}
