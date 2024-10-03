import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProdutoLojaDto {
  @IsNumber()
  @IsNotEmpty()
  produtoId: number;

  @IsNumber()
  @IsNotEmpty()
  lojaId: number;

  @IsNumber()
  @IsNotEmpty()
  precoVenda: number;

}
