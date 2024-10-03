import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProdutolojasService } from './produtolojas.service';
import { CreateProdutolojaDto } from './dto/create-produtoloja.dto';
import { UpdateProdutoLojaDto } from './dto/update-produtoloja.dto';

@Controller('produtolojas')
export class ProdutolojasController {
    constructor(private readonly produtolojasService: ProdutolojasService) {}

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.produtolojasService.find(+id);
  }

  @Get()
  findAll() {
    return this.produtolojasService.findall();
  }

  @Post()
  create(@Body() createProdutolojaDto: CreateProdutolojaDto) {
    return this.produtolojasService.create(createProdutolojaDto);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.produtolojasService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProdutoLojaDto: UpdateProdutoLojaDto,
  ) {
    return this.produtolojasService.update(+id, updateProdutoLojaDto);
  }
}
