import { MigrationInterface, QueryRunner } from 'typeorm';

export class playlistUserSongConnection1605220279704
  implements MigrationInterface {
  name = 'playlistUserSongConnection1605220279704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "songs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artist" character varying NOT NULL, "icon" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "genre" character varying NOT NULL, "icon" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "oktaId" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "birthdate" character varying NOT NULL, CONSTRAINT "UQ_361bea4aed142d129c310f21128" UNIQUE ("oktaId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "songs_playlists_playlist" ("songsId" uuid NOT NULL, "playlistId" uuid NOT NULL, CONSTRAINT "PK_2a5002c7005bd7a40db996a2e1f" PRIMARY KEY ("songsId", "playlistId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6641ccd7ddbac66c65034d5d1" ON "songs_playlists_playlist" ("songsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4e61cb4d41cab285a54a4a7f6e" ON "songs_playlists_playlist" ("playlistId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs_playlists_playlist" ADD CONSTRAINT "FK_d6641ccd7ddbac66c65034d5d12" FOREIGN KEY ("songsId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs_playlists_playlist" ADD CONSTRAINT "FK_4e61cb4d41cab285a54a4a7f6e7" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs_playlists_playlist" DROP CONSTRAINT "FK_4e61cb4d41cab285a54a4a7f6e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "songs_playlists_playlist" DROP CONSTRAINT "FK_d6641ccd7ddbac66c65034d5d12"`,
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_4e61cb4d41cab285a54a4a7f6e"`);
    await queryRunner.query(`DROP INDEX "IDX_d6641ccd7ddbac66c65034d5d1"`);
    await queryRunner.query(`DROP TABLE "songs_playlists_playlist"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "playlist"`);
    await queryRunner.query(`DROP TABLE "songs"`);
  }
}
