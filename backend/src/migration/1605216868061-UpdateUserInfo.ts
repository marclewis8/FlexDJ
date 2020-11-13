import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserInfo1605216868061 implements MigrationInterface {
  name = 'UpdateUserInfo1605216868061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
  }
}
