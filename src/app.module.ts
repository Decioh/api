import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProdutosModule } from './produtos/produtos.module';
import { LojasModule } from './lojas/lojas.module';
import { ProdutolojasModule } from './produtolojas/produtolojas.module';
import { AppDataSource } from './data-source'; // Importa a data source

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...AppDataSource.options,
      }),
    }),
    ProdutosModule,
    LojasModule,
    ProdutolojasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}