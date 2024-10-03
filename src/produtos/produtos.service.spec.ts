import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosService } from './produtos.service';
import { Produto } from '../entity/produto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProdutosService', () => {
  let ProdutoService: ProdutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        {
          provide: getRepositoryToken(Produto),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findBy: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        ProdutosService],
    }).compile();

    ProdutoService = module.get<ProdutosService>(ProdutosService);
  });

  it('should be defined', () => {
    expect(ProdutoService).toBeDefined();
  });
});
