import { EntityRepository, Repository } from 'typeorm';
import { Song, Playlist } from '../entity/';

@EntityRepository(Song)
export class SongRepository extends Repository<Song> {
  findByName(name: string) {
    return this.createQueryBuilder('songs')
      .where('songs.name = :name', { name })
      .getMany();
  }
  findById(id: string) {
    return this.findOne({ id });
  }
  findByArtist(artist: string) {
    return this.createQueryBuilder('songs')
      .where('songs.artist = :artist', { artist })
      .getMany();
  }
  findByUrl(url: string) {
    return this.findOne({ url });
  }
  async createAndSave(
    artist: string,
    icon: string,
    externalId: string,
    name: string,
    url: string,
  ) {
    const song = new Song();
    song.artist = artist;
    song.icon = icon;
    song.externalId = externalId;
    song.name = name;
    song.url = url;
    await this.manager.save(song);
    return song;
  }
}
