import { Entity, PrimaryGeneratedColumn, Column, Check } from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column()
  name: string;

  @Column()
  genre: string;

  @Column()
  icon: string; // URL or relative path?
}
