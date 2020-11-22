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
  icon: string; // URL to platform icon

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column({ default: '' })
  image: string; // URL to image

  @ApiProperty()
  @Column({ default: '' })
  preview: string; // URL to preview mp3

  @ManyToMany(() => Playlist, (playlist) => playlist.songs)
  @JoinTable()
  playlists: Playlist[];
}
