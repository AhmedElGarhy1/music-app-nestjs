import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from '../songs/entities/song.entity';
import { Music } from '../music/entities/music.entity';
import { Playlist } from '../playlists/entities/playlist.entity';
import { Favorite } from '../favorites/entities/favorite.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private readonly repo: Repository<Track>,
  ) {}

  async pushToPlaylist(tune: Song | Music, playlist: Playlist) {
    const track = this.pushTune(tune);
    track.playlist = playlist;
    return await track.save();
  }

  async pushToFavorite(tune: Song | Music, favorite: Favorite): Promise<Track> {
    const track = this.pushTune(tune);
    track.favorite = favorite;
    return await track.save();
  }

  async findById(id: number) {
    const track = await this.repo.findOne(id);
    return track;
  }

  async remove(id: number) {
    const track = await this.findById(id);
    if (!track) return null;

    const result = await this.repo.remove(track);
    return result;
  }

  pushTune(tune: Song | Music): Track {
    const track = this.repo.create();
    if (tune instanceof Song) {
      track.song = tune;
    } else if (tune instanceof Music) {
      track.music = tune;
    }
    track.title = tune.name;
    track.link = tune.source;
    return track;
  }
}
