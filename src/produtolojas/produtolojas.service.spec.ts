import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProdutolojasService } from './produtolojas.service';
import { ProdutoLoja } from '../entity/produtoloja.entity';
import { Loja } from '../entity/loja.entity';
import { Produto } from '../entity/produto.entity';
import { Repository } from 'typeorm';

const mockProdutoLoja = new ProdutoLoja({ id: 1, precoVenda: 100 });
const mockLoja = new Loja({ id: 1, descricao: 'Loja 1' });
const mockProduto = new Produto({ id: 1, descricao: 'Produto 1' });

describe('ProdutolojasService', () => {
  let service: ProdutolojasService;
  let produtolojaRepository: Repository<ProdutoLoja>;
  let lojaRepository: Repository<Loja>;
  let produtoRepository: Repository<Produto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutolojasService,
        {
          provide: getRepositoryToken(ProdutoLoja),
          useValue: {
            find: jest.fn().mockResolvedValue([mockProdutoLoja]),
            findOne: jest.fn().mockResolvedValue(mockProdutoLoja),
            create: jest.fn().mockReturnValue(mockProdutoLoja),
            save: jest.fn().mockResolvedValue(mockProdutoLoja),
            remove: jest.fn().mockResolvedValue(mockProdutoLoja),
            update: jest.fn().mockResolvedValue(mockProdutoLoja),
          },
        },
        {
          provide: getRepositoryToken(Loja),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockLoja),
          },
        },
        {
          provide: getRepositoryToken(Produto),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockProduto),
            find: jest.fn().mockResolvedValue([mockProduto]),
          },
        },
      ],
    }).compile();

    service = module.get<ProdutolojasService>(ProdutolojasService);
    produtolojaRepository = module.get<Repository<ProdutoLoja>>(getRepositoryToken(ProdutoLoja));
    lojaRepository = module.get<Repository<Loja>>(getRepositoryToken(Loja));
    produtoRepository = module.get<Repository<Produto>>(getRepositoryToken(Produto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new ProdutoLoja', async () => {
      // Ajustando o mock do método findById para retornar null
      jest.spyOn(service, 'findById').mockResolvedValueOnce(null);
      const createDto = { lojaId: 2, produtoId: 2, precoVenda: 100 };
      const result = await service.create(createDto);
      expect(result).toEqual(mockProdutoLoja);
      expect(produtolojaRepository.save).toHaveBeenCalledWith(mockProdutoLoja);
    });

    it('should throw an error if produto not found', async () => {
      jest.spyOn(produtoRepository, 'findOne').mockResolvedValueOnce(null);
      const createDto = { lojaId: 1, produtoId: 999, precoVenda: 100 };
      await expect(service.create(createDto)).rejects.toThrow('Produto com ID 999 não encontrado');
    });

    it('should throw an error if loja not found', async () => {
      jest.spyOn(lojaRepository, 'findOne').mockResolvedValueOnce(null);
      const createDto = { lojaId: 999, produtoId: 1, precoVenda: 100 };
      await expect(service.create(createDto)).rejects.toThrow('Loja com ID 999 não encontrada');
    });

    it('should throw an error if ProdutoLoja already exists', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(mockProdutoLoja);
      const createDto = { lojaId: 1, produtoId: 1, precoVenda: 100 };
      await expect(service.create(createDto)).rejects.toThrow('Produto já cadastrado na loja');
    });
  });

  describe('findById', () => {
    it('should return a ProdutoLoja', async () => {
      const result = await service.findById(1, 1);
      expect(result).toEqual(mockProdutoLoja);
    });
  
    it('should throw an error if ProdutoLoja not found', async () => {
      jest.spyOn(produtolojaRepository, 'findOne').mockRejectedValueOnce(new Error('Database error'));
      await expect(service.findById(999, 999)).rejects.toThrow('ProdutoLoja não encontrado: Database error');
    });
  });

  describe('findall', () => {
    it('should return an array of ProdutoLoja', async () => {
      const result = await service.findall();
      expect(result).toEqual([mockProdutoLoja]);
    });
  });

  describe('find', () => {
    it('should return a product with its stores', async () => {
      const result = await service.find(1);
      expect(result).toEqual({
        id: mockProduto.id,
        descricao: mockProduto.descricao,
        custo: mockProduto.custo,
        imagem: mockProduto.imagem ? mockProduto.imagem.toString() : null,
        lojas: [mockProdutoLoja],
      });
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(produtoRepository, 'find').mockResolvedValueOnce([]);
      await expect(service.find(999)).rejects.toThrow('Error finding product-store');
    });
  });

  describe('findByCost', () => {
    it('should return products with a specific cost', async () => {
      const result = await service.findByCost(100);
      expect(result).toEqual([mockProdutoLoja]);
    });
  });

  describe('update', () => {
    it('should update and return an existing ProdutoLoja', async () => {
      const updateDto = { produtoId: 1, lojaId: 1, precoVenda: 200 };
      const result = await service.update(1, updateDto);
      expect(result).toEqual({ id: 1 });
      expect(produtolojaRepository.update).toHaveBeenCalledWith({ id: 1 }, { loja: { id: 1 }, produto: { id: 1 }, precoVenda: 200 });
    });

    it('should throw an error if ProdutoLoja not found', async () => {
      jest.spyOn(produtolojaRepository, 'findOne').mockResolvedValueOnce(null);
      const updateDto = { produtoId: 1, lojaId: 1, precoVenda: 200 };
      await expect(service.update(100, updateDto)).rejects.toThrow('Product-Store with ID 100 not found');
    });

    it('should throw an error if ProdutoLoja already exists', async () => {
      const existingProdutoLoja = new ProdutoLoja({ id: 2, precoVenda: 100 });
      jest.spyOn(produtolojaRepository, 'findOne').mockResolvedValueOnce(mockProdutoLoja).mockResolvedValueOnce(existingProdutoLoja);
      const updateDto = { produtoId: 1, lojaId: 1, precoVenda: 200 };
      await expect(service.update(1, updateDto)).rejects.toThrow('Error updating product-store: Product with already with cost for this store');
    });
  });

  describe('remove', () => {
    it('should remove a ProdutoLoja and return success', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(mockProdutoLoja);
      expect(produtolojaRepository.remove).toHaveBeenCalledWith(mockProdutoLoja);
    });

    it('should throw an error if ProdutoLoja not found', async () => {
      jest.spyOn(produtolojaRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.remove(999)).rejects.toThrow('Product-Store with ID 999 not found');
    });
  });
});