import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateFieldValueInProduct1614435866841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products', new TableColumn({
            name: 'value',
            type: 'double'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'value');
    }

}
