import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNumber()
  readonly age: number;
  @ApiProperty()
  @IsString()
  readonly breed: string;
}
