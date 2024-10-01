import { Test, TestingModule } from '@nestjs/testing';
import { ProdutolojasService } from './produtolojas.service';

describe('ProdutolojasService', () => {
  let service: ProdutolojasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutolojasService],
    }).compile();

    service = module.get<ProdutolojasService>(ProdutolojasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
