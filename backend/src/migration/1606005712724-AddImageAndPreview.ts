import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageAndPreview1606005712724 implements MigrationInterface {
  name = 'AddImageAndPreview1606005712724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" ADD "image" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs" ADD "preview" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "preview"`);
    await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "image"`);
  }
}
