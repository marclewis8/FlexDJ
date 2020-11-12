import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from './User';
import { Song } from './Song';

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

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;

  @ManyToMany(() => Song, (song) => song.playlists)
  songs: Song[];
}
