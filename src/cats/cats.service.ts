import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { EditCatDto } from './dto/edit-cat.dto';
import { Cat } from './entities/cat.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const cat = this.catRepository.create(createCatDto);
    return await this.catRepository.save(cat);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    if (paginationQuery.limit > 0 && paginationQuery.offset >= 0) {
      return this.catRepository.find({
        skip: offset,
        take: limit,
      });
    } else {
      throw new BadRequestException(
        ` limit and offset not found in the request`,
      );
    }
  }

  async findOne(id: number) {
    const cat = await this.catRepository.findOne(id);

    if (!cat) {
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return cat;
  }

  async delete(id: number) {
    const cat = await this.catRepository.findOne(id);
    if (!cat) {
      throw new NotFoundException(`The cat ${id} does not exist`);
    }
    return await this.catRepository.delete(id);
  }

  async edit(id: number, editCatDto: EditCatDto) {
    const cat = await this.catRepository.findOne(id);
    if (!cat) throw new NotFoundException(`Cat does not exist`);
    const editedCat = Object.assign(cat, editCatDto);
    console.log(cat);
    console.log(editCatDto);
    console.log(editedCat);
    return await this.catRepository.save(editedCat);
  }
}
