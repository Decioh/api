import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOperator, ILike, EntityManager } from 'typeorm';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutoLoja } from '../entity/produtoloja.entity';
import { Loja } from '../entity/loja.entity';
import { Produto } from '../entity/produto.entity';

@Injectable()
export class ProdutosService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        @InjectRepository(ProdutoLoja)
        private produtoLojaRepository: Repository<ProdutoLoja>,
        @InjectRepository(Loja)
        private lojaRepository: Repository<Loja>,
        private entityManager: EntityManager,
    ) {}
    //Retorna todos os produtos
    async findall(): Promise<Produto[]> {
        return this.produtoRepository.find({order: { id: 'ASC' }});
    }
    //Retorna um produto pelo id
    async findone(id: number): Promise<Produto> {
        return await this.produtoRepository.findOne({ where: { id } }); 
    }
    //Cria um novo produto
    async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
        let newProduto;
        const queryRunner = this.entityManager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const produto = {
                descricao: createProdutoDto.descricao,
                custo: createProdutoDto.custo,
                imagem: createProdutoDto.imagem,
            };
            newProduto = await this.produtoRepository.save(produto);

            for (const loja of createProdutoDto.lojas) {
                const lojaExists = await this.lojaRepository.findOne({
                    where: { id: loja.id },
                });
                if (!lojaExists) {
                    throw new Error(`Store with ID ${loja.id} not found`);
                }
                const createPricesResource = {
                    produto: { id: newProduto.id },
                    loja: { id: loja.id },
                    precoVenda: loja.precoVenda,
                };
                if (isNaN(createPricesResource.produto.id || createPricesResource.produto.id === null)){
                    throw Error('Produto Id is NULL');
                }
                const newProdutoLoja = this.produtoLojaRepository.create(createPricesResource);
                await this.produtoLojaRepository.save(newProdutoLoja);
            }

            await queryRunner.commitTransaction();
            return newProduto.id;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(`Error creating produto: ${error.message}`);
        }
        finally {
            queryRunner.release();
        }
    }
    
    //Atualiza um produto
    async update(id: number, UpdateProdutoDto: UpdateProdutoDto) {
        let produtoToUpdate;
        let lojasRecover = [] as ProdutoLoja[];
        const lojaToDelete = [] as ProdutoLoja[];
        const queryRunner = this.entityManager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
          const lojasRecoverResponse = await this.produtoLojaRepository.find({
            where: { produto: { id } },
          });
          lojasRecover = [...lojasRecoverResponse];
          await this.produtoLojaRepository.remove(lojasRecoverResponse);
          produtoToUpdate = await this.produtoRepository.find({
            where: { id },
          });
          if (produtoToUpdate.length === 0) {
            throw new Error(`Produto with ID ${id} not found`);
          }
    
          const produto = {
            descricao: UpdateProdutoDto.descricao,
            custo: UpdateProdutoDto.custo,
            imagem: UpdateProdutoDto.imagem,
          };
    
          await this.produtoRepository.update(id, produto);
    
          for (const loja of UpdateProdutoDto.lojas) {
            const lojaExists = await this.lojaRepository.findOne({
              where: { id: loja.id },
            });
            if (!lojaExists) {
              throw new Error(`Store with ID ${loja.id} not found`);
            }
    
            const createPricesResource = {
              produto: { id: id },
              loja: { id: loja.id },
              precoVenda: loja.precoVenda,
            };
    
            if (
              isNaN(createPricesResource.produto.id) ||
              createPricesResource.produto.id === null
            ) {
              throw Error('Produto Id is NULL');
            }
    
            const newProdutoLoja =
              this.produtoLojaRepository.create(createPricesResource);
    
            const lojaToRemove =
              await this.produtoLojaRepository.save(newProdutoLoja);
            lojaToDelete.push(lojaToRemove);
          }
          await queryRunner.commitTransaction();
        } catch (error) {
          await queryRunner.rollbackTransaction();
    
          if (produtoToUpdate) {
            await this.produtoRepository.update(produtoToUpdate.id, {
              descricao: produtoToUpdate.descricao,
              custo: produtoToUpdate.custo,
              imagem: produtoToUpdate.imagem,
            });
          }
          if (lojaToDelete.length > 0) {
            for (const lojas of lojaToDelete) {
              await this.produtoLojaRepository.remove(lojas);
            }
          }
          if (lojasRecover.length > 0) {
            for (const lojas of lojasRecover) {
              await this.produtoLojaRepository.save(lojas);
            }
          }
    
          throw new Error(`Error updating produto: ${error.message}`);
        } finally {
          queryRunner.release();
        }
      }
    
      // Deleta um produto
      async remove(id: number): Promise<void> {
        await this.produtoRepository.delete(id);
      }
    
    //Pesquisa produtos
    async search(params: {
        id?: number;
        descricao?: string;
        custo?: number;
        precoVenda?: number;
      }) {
        if (
          !params?.id &&
          !params?.descricao &&
          !params?.custo &&
          !params?.precoVenda
        )
          return [];
    
        try {
          const searchParams = { produtoloja: {} } as {
            id?: number;
            descricao?: FindOperator<string>;
            custo?: number;
            produtoloja: { precoVenda?: number };
          };
          if (!isNaN(params?.id)) searchParams.id = params.id;
          if (params?.descricao)
            searchParams.descricao = ILike(`%${params.descricao}%`);
          if (!isNaN(params?.custo)) searchParams.custo = params.custo;
          if (!isNaN(params?.precoVenda)) {
            searchParams.produtoloja.precoVenda = params.precoVenda;
          }
    
          const produtos = await this.produtoRepository.find({
            where: { ...searchParams },
          });
          return produtos;
        } catch (error) {
          throw new Error(`Error getting Produtos: ${error.message}`);
        }
    }
      //Encontra um produto pelo id
    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOne({where: {id}});
        return produto;
    }
    
}
