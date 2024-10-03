import { Test, TestingModule } from '@nestjs/testing';
import { ProdutolojasService } from './produtolojas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProdutoLoja } from '../entity/produtoloja.entity';
import { Loja } from '../entity/loja.entity';
import { Produto } from '../entity/produto.entity';

describe('ProdutolojasService', () => {
  let service: ProdutolojasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutolojasService,
        {
          provide: getRepositoryToken(ProdutoLoja),
          useFactory: jest.fn(() => ({})),
        },
        {
          provide: getRepositoryToken(Loja),
          useFactory: jest.fn(() => ({})),
        },
        {
          provide: getRepositoryToken(Produto),
          useFactory: jest.fn(() => ({})),
        },
      ],
    }).compile();

    service = module.get<ProdutolojasService>(ProdutolojasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
