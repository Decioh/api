import { Test, TestingModule } from '@nestjs/testing';
import { LojasService } from './lojas.service';
import { Loja } from '../entity/loja.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const LojaEntityList: Loja[] = [
  new Loja({ id: 1, descricao: 'Loja 1'}),
  new Loja({ id: 2, descricao: 'Loja 2'}),
  new Loja({ id: 3, descricao: 'Loja 3'})
];

describe('LojasService', () => {
  let lojaService: LojasService;
  let lojaRepository: Repository<Loja>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LojasService,
        {
          provide: getRepositoryToken(Loja),
          useValue: {
            find: jest.fn().mockResolvedValue(LojaEntityList),
            findOne: jest.fn().mockResolvedValue(LojaEntityList[0]),
          },
        }
      ],
    }).compile();

    lojaService = module.get<LojasService>(LojasService);
    lojaRepository = module.get<Repository<Loja>>(getRepositoryToken(Loja));
  });

  it('should be defined', () => {
    expect(lojaService).toBeDefined();
    expect(lojaRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of lojas', async () => {
      const result = await lojaService.findAll();
      expect(result).toEqual(LojaEntityList);
      expect(lojaRepository.find).toHaveBeenCalledTimes(1);
    });
    it('Should return an exception', async () => {
      jest.spyOn(lojaRepository, 'find').mockRejectedValueOnce(new Error('Erro ao buscar lojas'));
      expect(lojaService.findAll()).rejects.toThrow('Erro ao buscar lojas');
    });
  });
  describe('findOne', () => {
    it('should return a loja', async () => {
      const result = await lojaService.findOne(1);
      expect(result).toEqual(LojaEntityList[0]);
      expect(lojaRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('Should return an exception', async () => {
      jest.spyOn(lojaRepository, 'findOne').mockRejectedValueOnce(new Error('Erro ao buscar loja'));
      expect(lojaService.findOne(1)).rejects.toThrow('Erro ao buscar loja');
    });
  });
});
