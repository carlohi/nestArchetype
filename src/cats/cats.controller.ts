import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { EditCatDto } from './dto/edit-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    const data = this.catsService.create(createCatDto);
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Put(':id')
  update(
    @Body() editCatDto: EditCatDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = this.catsService.edit(id, editCatDto);
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.catsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.delete(id);
  }
}
