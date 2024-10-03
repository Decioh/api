import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtosService.findall();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findone(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }

  @Get('search')
  findBy(
    @Query('descricao') descricao: string,
    @Query('id') id: number,
    @Query('custo') custo: number,
    @Query('precoVenda') precoVenda: number,
  ) {
    return this.produtosService.search({
      descricao,
      id: +id,
      custo: +custo,
      precoVenda: +precoVenda,
    });
  }
}