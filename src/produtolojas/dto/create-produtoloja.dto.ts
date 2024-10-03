import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProdutolojaDto {
  @IsNotEmpty()
  @IsNumber()
  produtoId: number;

  @IsNotEmpty()
  @IsNumber()
  lojaId: number;

  @IsNumber()
  @IsNotEmpty()
  precoVenda: number;
}