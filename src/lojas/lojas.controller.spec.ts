import { Test, TestingModule } from '@nestjs/testing';
import { LojasController } from './lojas.controller';
import { LojasService } from './lojas.service';
import { Loja } from '../entity/loja.entity';

describe('LojasController', () => {
  let lojaController: LojasController;
  let lojaService: LojasService;
  const LojaEntityList: Loja[] = [
    new Loja({ id: 1, descricao: 'Loja 1' }),
    new Loja({ id: 2, descricao: 'Loja 2' }),
    new Loja({ id: 3, descricao: 'Loja 3' })
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LojasController],
      providers: [
        {
          provide: LojasService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(LojaEntityList),
            findOne: jest.fn().mockResolvedValue(LojaEntityList[0]),
          },
        },
      ],
    }).compile();

    lojaController = module.get<LojasController>(LojasController);
    lojaService = module.get<LojasService>(LojasService);
  });

  it('should be defined', () => {
    expect(lojaController).toBeDefined();
    expect(lojaService).toBeDefined();
  });
  //Testa se o método findAll retorna um array de lojas
  describe('findAll', () => {
    it('should return an array of lojas', async () => {
      const result = await lojaController.findAll();
      expect(result).toBe(LojaEntityList);  
    });
  });
  //Testa se o método findOne retorna uma loja
  describe('findOne', () => {
    it('should return a loja', async () => {
      const result = await lojaController.findOne(1); 
      expect(result).toBe(LojaEntityList[0]);  
    });
    //Testa se o método findOne lança um erro caso a loja não seja encontrada
    it('should throw an exception', () => {
      jest.spyOn(lojaService, 'findOne').mockRejectedValueOnce(new Error('Loja não encontrada'));

      expect(lojaController.findOne(999)).rejects.toThrow('Loja não encontrada');
    });
  });

});
