import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Playlist } from './Playlist';

@Entity({ name: 'songs' })
export class Song {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column()
  icon: string; // URL to image

  @Column()
  url: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.songs)
  @JoinTable()
  playlists: Playlist[];
}
