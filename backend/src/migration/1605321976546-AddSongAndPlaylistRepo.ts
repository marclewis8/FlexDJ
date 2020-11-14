import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSongAndPlaylistRepo1605321976546 implements MigrationInterface {
  name = 'AddSongAndPlaylistRepo1605321976546';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "playlists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "genre" character varying NOT NULL, "icon" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_a4597f4189a75d20507f3f7ef0d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "songs_playlists_playlists" ("songsId" uuid NOT NULL, "playlistsId" uuid NOT NULL, CONSTRAINT "PK_d64816f66c8e2d5de6d1eb7bc20" PRIMARY KEY ("songsId", "playlistsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_81db948e951cd51859747a8831" ON "songs_playlists_playlists" ("songsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5948a04b9451ff57a540bcfcab" ON "songs_playlists_playlists" ("playlistsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "songs" ADD "externalId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs_playlists_playlists" ADD CONSTRAINT "FK_81db948e951cd51859747a88314" FOREIGN KEY ("songsId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs_playlists_playlists" ADD CONSTRAINT "FK_5948a04b9451ff57a540bcfcab1" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs_playlists_playlists" DROP CONSTRAINT "FK_5948a04b9451ff57a540bcfcab1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs_playlists_playlists" DROP CONSTRAINT "FK_81db948e951cd51859747a88314"`,
    );
    await queryRunner.query(
      `ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`,
    );
    await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "externalId"`);
    await queryRunner.query(`DROP INDEX "IDX_5948a04b9451ff57a540bcfcab"`);
    await queryRunner.query(`DROP INDEX "IDX_81db948e951cd51859747a8831"`);
    await queryRunner.query(`DROP TABLE "songs_playlists_playlists"`);
    await queryRunner.query(`DROP TABLE "playlists"`);
  }
}
