import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDefaultInCreatedUpdatedAtInProduct1614436532124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE products MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query(
            "ALTER TABLE products MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
