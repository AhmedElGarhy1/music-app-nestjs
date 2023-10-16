import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from '../playlists/entities/playlist.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Tune } from '../tunes/entities/tune.entity';
import { TunesService } from '../tunes/tunes.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private readonly repo: Repository<Track>,
    private readonly tunesSerivce: TunesService,
  ) {}

  async pushToPlaylist(playlistId: number, tuneId: number) {
    await this.checkUniqueness(playlistId, null, tuneId);
    const tune = await this.tunesSerivce.findOne(tuneId);
    const track = this.pushTune(tune);
    track.playlistId = playlistId;
    return await track.save();
  }

  async pushToFavorite(favoriteId: number, tuneId: number): Promise<Track> {
    await this.checkUniqueness(null, favoriteId, tuneId);
    const tune = await this.tunesSerivce.findOne(tuneId);
    const track = this.pushTune(tune);
    track.favoriteId = favoriteId;
    return await track.save();
  }

  async findById(id: number) {
    const track = await this.repo.findOne(id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  async remove(id: number) {
    const track = await this.findById(id);

    const result = await this.repo.remove(track);
    return result;
  }

  async removeMany(ids: number[]) {
    const track = await this.repo.find({
      where: {
        id: In(ids),
      },
    });

    const result = await this.repo.remove(track);
    return result;
  }

  pushTune(tune: Tune): Track {
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
