import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User, Song } from './';

@Entity({ name: 'playlists' })
export class Playlist {
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
  genre: string;

  @ApiProperty()
  @Column()
  icon: string; // URL or relative path?

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;

  @ManyToMany(() => Song, (song) => song.playlists)
  songs: Song[];
}
