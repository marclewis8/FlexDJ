import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Playlist } from './';

@Entity({ name: 'songs' })
export class Song {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  externalId: string;

  @ApiProperty()
  @Column()
  artist: string;

  @ApiProperty()
  @Column()
  icon: string; // URL to image

  @ApiProperty()
  @Column()
  url: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.songs)
  @JoinTable()
  playlists: Playlist[];
}
