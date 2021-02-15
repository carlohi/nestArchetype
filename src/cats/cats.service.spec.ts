import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CatsService', () => {
  let service: CatsService;
  let catsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Cat),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    catsRepository = module.get<MockRepository>(getRepositoryToken(Cat));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when cat with id exists', () => {
      it('Should return the cat object', async () => {
        const catId = 1;
        const expectedCat = {};

        catsRepository.findOne.mockReturnValue(expectedCat);
        const cat = await service.findOne(catId);
        expect(cat).toEqual(expectedCat);
      });
    });
    describe('otherwise', () => {
      it('Should throw notFoundException', async (done) => {
        const catId = 1;
        catsRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(catId);
          done();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Cat #${catId} not found`);
          done();
        }
      });
    });
  });
});
