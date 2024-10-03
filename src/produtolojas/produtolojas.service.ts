import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutolojaDto } from './dto/create-produtoloja.dto'; 
import { UpdateProdutoLojaDto } from './dto/update-produtoloja.dto'; 
import { ProdutoLoja } from '../entity/produtoloja.entity';
import { Loja } from '../entity/loja.entity';
import { Produto } from '../entity/produto.entity';

@Injectable()
export class ProdutolojasService {
  private produtolojas = [];

  constructor(
    @InjectRepository(ProdutoLoja)
    private produtolojaRepository: Repository<ProdutoLoja>,
    @InjectRepository(Loja)
    private lojaRepository: Repository<Loja>,
    @InjectRepository(Produto)
    private ProdutoRepository: Repository<Produto>,
  ) {}

  async create({ lojaId, produtoId, precoVenda }: CreateProdutolojaDto) {
    try {
      const produto = await this.ProdutoRepository.findOne({ where: { id: produtoId } });
      const loja = await this.lojaRepository.findOne({ where: { id: lojaId } });

      if (!produto) throw new Error(`Produto com ID ${produtoId} não encontrado`);
      if (!loja) throw new Error(`Loja com ID ${lojaId} não encontrada`);

      const produtoLojaExiste = await this.findById(lojaId, produtoId);
      if (produtoLojaExiste) throw new Error(`Produto já cadastrado na loja`);

      const newProdutoLoja = this.produtolojaRepository.create({
        loja: { id: lojaId },
        produto: { id: produtoId },
        precoVenda,
      });

      return await this.produtolojaRepository.save(newProdutoLoja);
    } catch (error) {
      throw new Error(`Erro ao criar produto-loja: ${error.message}`);
    }
  }

  findById(lojaId: number, produtoId: number) {
    try {
      return this.produtolojaRepository.findOne({
        where: { loja: { id: lojaId }, produto: { id: produtoId } },
      });
    } catch (error) {
      throw new Error(`ProdutoLoja não encontrado: ${error.message}`);
    }
  }

  findall() {
    return this.produtolojaRepository.find();
  }

  async find(id: number) {
    try {
      const [produto] = await this.ProdutoRepository.find({ where: { id } });
      const lojas = await this.produtolojaRepository.find({
        where: { produto: { id } },
        order: { loja: { id: 'ASC' } },
        relations: ['loja'],
        select: ['precoVenda'],
      });
      return {
        id: produto.id,
        descricao: produto.descricao,
        custo: produto.custo,
        imagem: produto.imagem ? produto.imagem.toString() : null,
        lojas,
      };
    } catch (error) {
      throw new Error(`Error finding product-store: ${error.message}`);
    }
  }

  findByCost(precoVenda: number) {
    try {
      return this.produtolojaRepository.find({ where: { precoVenda } });
    } catch (error) {
      throw new Error(`Error finding product-store: ${error.message}`);
    }
  }

  async update(
    id: number,
    { produtoId, lojaId, precoVenda }: UpdateProdutoLojaDto,
  ) {
    try {
      const productToUpdate = await this.produtolojaRepository.findOne({
        where: {
          id,
        },
      });
      const produtolojaExists = await this.produtolojaRepository.findOne({
        where: {
          loja: { id: lojaId },
          produto: { id: produtoId },
        },
      });
      if (!productToUpdate)
        throw new Error(`Product-Store with ID ${id} not found`);

      if (produtolojaExists && productToUpdate.id !== produtolojaExists?.id)
        throw new Error(`Product with ID ${produtoId} already with 
        cost in store ID ${lojaId}`);

      await this.produtolojaRepository.update(
        { id },
        {
          ...{ loja: { id: lojaId }, produto: { id: produtoId }, precoVenda },
        },
      );
      return { id };
    } catch (error) {
      throw new Error(`Error updating product-store: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const produtolojaToRemove = await this.produtolojaRepository.findOne({ where: {id } });
      if (!produtolojaToRemove)
        throw new Error(`Product-Store with ID ${id} not found`);
      return this.produtolojaRepository.remove(produtolojaToRemove);
    } catch (error) {
      throw new Error(`Error removing product-store: ${error.message}`);
    }
  }
}