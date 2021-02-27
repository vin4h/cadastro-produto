import { query } from "express";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProduct1614431359889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'varchar'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'amount',
                    type: 'double'
                },
                {
                    name: 'user_id',
                    type: 'varchar'
                },
                {
                    name: 'created_at',
                    type: 'timestamp'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp'
                }
            ]
        }));

        await queryRunner.createForeignKey('product', new TableForeignKey({
            name: 'productUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'productUser');

        await queryRunner.dropTable('products');
    }

}
