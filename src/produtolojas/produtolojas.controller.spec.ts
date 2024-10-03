import { Test, TestingModule } from '@nestjs/testing';
import { ProdutolojasController } from './produtolojas.controller';

describe('ProdutolojasController', () => {
  let controller: ProdutolojasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutolojasController],
      providers: [],
    }).compile();

    controller = module.get<ProdutolojasController>(ProdutolojasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});