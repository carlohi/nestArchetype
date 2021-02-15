import { IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({ required: false, default: 10, minimum: 1 })
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({ required: false, default: 1, minimum: 0 })
  @IsOptional()
  offset: number;
}
