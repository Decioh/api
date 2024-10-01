import { MigrationInterface, QueryRunner } from "typeorm";

export class NewDB1727810992955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "produto" (
                "id" SERIAL PRIMARY KEY,
                "descricao" VARCHAR(60) NOT NULL,
                "custo" NUMERIC(13, 3),
                "imagem" BYTEA
            );
        `);

        await queryRunner.query(`
            CREATE TABLE "loja" (
                "id" SERIAL PRIMARY KEY,
                "descricao" VARCHAR(60)
            );
        `);

        await queryRunner.query(`
            CREATE TABLE "produto_loja" (
                "id" SERIAL PRIMARY KEY,
                "preco" NUMERIC(13, 3),
                "produtoId" INTEGER NOT NULL,
                "lojaId" INTEGER NOT NULL,
                CONSTRAINT "FK_produto" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_loja" FOREIGN KEY ("lojaId") REFERENCES "loja"("id") ON DELETE CASCADE,
                CONSTRAINT "UQ_produto_loja" UNIQUE ("produtoId", "lojaId")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "produto_loja";`);
        await queryRunner.query(`DROP TABLE "loja";`);
        await queryRunner.query(`DROP TABLE "produto";`);
    }
}