import { Controller, Get, Post, Body, Param, Delete, Put  } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { Loja } from '../entity/loja.entity';

@Controller('lojas')
export class LojasController {
    constructor(private readonly lojasService: LojasService) {}
    //Retorna todas as lojas
    @Get()
    async findAll(): Promise<Loja[]> {
        return this.lojasService.findall();
    }
    //Retorna uma loja pelo id
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Loja> {
        const user = this.lojasService.findOne(id);
        if (!user) {
            throw new Error('Loja não encontrada');
        } else {
            return user;
        }
    }
    //Cria uma nova loja
    @Post()
    create(@Body() loja: Loja): Promise<Loja> {
        return this.lojasService.create(loja);
    }
    //Atualiza uma loja
    @Put(':id')
    update(@Param('id') id: number, @Body() loja: Loja): Promise<Loja> {
        return this.lojasService.update(id, loja);
    }
    //Remove uma loja
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        const loja = this.lojasService.findOne(id);
        if (!loja) {
            throw new Error('Loja não encontrada');
        }
        return this.lojasService.remove(id);
    }
}
