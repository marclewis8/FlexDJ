import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailField1604290194019 implements MigrationInterface {
  name = 'AddEmailField1604290194019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "oktaId" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "birthdate" character varying NOT NULL, CONSTRAINT "UQ_361bea4aed142d129c310f21128" UNIQUE ("oktaId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
