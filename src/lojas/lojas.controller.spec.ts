import { Test, TestingModule } from '@nestjs/testing';
import { LojasController } from './lojas.controller';
import { LojasService } from './lojas.service';

describe('LojasController', () => {
  let controller: LojasController;
  let service: LojasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LojasController],
    }).compile();

    controller = module.get<LojasController>(LojasController);
    service = module.get<LojasService>(LojasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
