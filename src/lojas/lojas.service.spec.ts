import { Test, TestingModule } from '@nestjs/testing';
import { LojasService } from './lojas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Loja } from '../entity/loja.entity';

describe('LojasService', () => {
  let service: LojasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LojasService,
      {
        provide: getRepositoryToken(Loja),
        useFactory: jest.fn(() => ({})),
      }],
    }).compile();

    service = module.get<LojasService>(LojasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
