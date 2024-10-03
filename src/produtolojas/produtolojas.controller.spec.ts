import { Test, TestingModule } from '@nestjs/testing';
import { ProdutolojasController } from './produtolojas.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProdutoLoja } from '../entity/produtoloja.entity';
import { Loja } from '../entity/loja.entity';
import { Produto } from '../entity/produto.entity';

describe('ProdutolojasController', () => {
  let controller: ProdutolojasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutolojasController],
      providers: [
        {
          provide: getRepositoryToken(ProdutoLoja),
          useFactory: jest.fn(() => ({})),
        },
        ,
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

    controller = module.get<ProdutolojasController>(ProdutolojasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});