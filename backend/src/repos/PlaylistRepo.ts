import { EntityRepository, Repository } from 'typeorm';
import { User, Playlist, Song } from '../entity/';

@EntityRepository(Playlist)
export class PlaylistRepository extends Repository<Playlist> {
  addSong(playlist: Playlist, song: Song) {
    return this.createQueryBuilder()
      .relation(Playlist, 'songs')
      .of(playlist)
      .add(song);
  }
  removeSong(playlist: Playlist, song: Song) {
    return this.createQueryBuilder()
      .relation(Playlist, 'songs')
      .of(playlist)
      .remove(song);
  }
  // todo: add ability to change playlist name & genre
  findByName(name: string, user: string) {
    return this.createQueryBuilder('playlists')
      .where('playlists.name = :name', { name })
      .andWhere('playlists.user = :user', { user })
      .getMany();
  }
  findById(id: string) {
    return this.findOne({ id });
  }
  findByUser(user: User) {
    return this.createQueryBuilder('playlists')
      .where('playlists.user = :user', { user })
      .getMany();
  }
  findByGenre(genre: string) {
    return this.createQueryBuilder('playlists')
      .where('playlists.genre = :user', { genre })
      .getMany();
  }
  createAndSave(
    genre: string,
    icon: string,
    name: string,
    songs: Song[],
    user: User,
  ) {
    const playlist = new Playlist();
    playlist.genre = genre;
    playlist.icon = icon;
    playlist.name = name;
    playlist.songs = songs;
    playlist.user = user;
    return this.manager.save(playlist);
  }
}
