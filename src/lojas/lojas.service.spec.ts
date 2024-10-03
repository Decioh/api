import { Test, TestingModule } from '@nestjs/testing';
import { LojasService } from './lojas.service';

describe('LojasService', () => {
  let lojaService: LojasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LojasService],
    }).compile();

    lojaService = module.get<LojasService>(LojasService);
  });

  it('should be defined', () => {
    expect(lojaService).toBeDefined();
  });
});
