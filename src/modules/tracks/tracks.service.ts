import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from '../playlists/entities/playlist.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Tune } from '../tunes/entities/tune.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private readonly repo: Repository<Track>,
  ) {}

  async pushToPlaylist(playlist: playli, tuneId: number) {
    await this.checkUniqueness(playlistId, null, tuneId);
    const track = this.pushTune(tune);
    track.playlist = playlist;
    return await track.save();
  }

  async pushToFavorite(tune: Tune, favorite: Favorite): Promise<Track> {
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

  pushTune(tuneId: tune): Track {
    const track = this.repo.create();

    track.tune = tune;
    track.title = tune.name;
    track.link = tune.source;
    return track;
  }
  async checkUniqueness(
    playlistId: number | null,
    favoriteId: number | null,
    tuneId: number,
  ): Promise<void> {
    const track = await this.repo.findOne({ playlistId, favoriteId, tuneId });
    if (track) throw new BadRequestException('this tuneId is already exists');
  }
}
