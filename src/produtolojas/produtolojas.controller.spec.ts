import { Test, TestingModule } from '@nestjs/testing';
import { ProdutolojasController } from './produtolojas.controller';
import { ProdutolojasService } from './produtolojas.service';

describe('ProdutolojasController', () => {
  let controller: ProdutolojasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutolojasController],
      providers: [
        {
          provide: ProdutolojasService,
          useValue:{
          find: jest.fn(),
          findOne: jest.fn(),
          create: jest.fn(),
          save: jest.fn(),
          remove: jest.fn(),
          update: jest.fn(),
          },
        },  
      ],
    }).compile();

    controller = module.get<ProdutolojasController>(ProdutolojasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});