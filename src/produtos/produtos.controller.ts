import { Controller, Get } from '@nestjs/common';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) {}

    //Retorna todos os produtos
    
}
