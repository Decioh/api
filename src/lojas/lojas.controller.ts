import { Controller, Get, Post, Body, Param, Delete, Put  } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { Loja } from '../entity/loja.entity';

@Controller('lojas')
export class LojasController {
    constructor(private readonly lojasService: LojasService) {}
    //Retorna todas as lojas
    @Get()
    async findAll(): Promise<Loja[]> {
        return this.lojasService.findAll();
    }
    //Retorna uma loja pelo id
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Loja> {
        const loja = this.lojasService.findOne(id);
        if (!loja) {
            throw new Error('Loja não encontrada');
        } else {
            return loja;
        }
    }
}
