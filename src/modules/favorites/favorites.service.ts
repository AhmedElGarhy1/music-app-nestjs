import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { TracksService } from '../tracks/tracks.service';
import { Song } from '../songs/entities/song.entity';
import { Music } from '../music/entities/music.entity';
import { MusicService } from '../music/music.service';
import { SongsService } from '../songs/songs.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private readonly repo: Repository<Favorite>,
    private readonly tracksService: TracksService,
    private readonly songsSerivce: SongsService,
    private readonly musicService: MusicService,
  ) {}

  async create() {
    const favoriteInstance = this.repo.create();
    const favorite = this.repo.save(favoriteInstance);
    return favorite;
  }

  async findById(id: number) {
    const favorite = this.repo.findOne(id);
    return favorite;
  }

  async addFavoriteItem(favoriteId: number, data: CreateFavoriteDto) {
    let tune: Song | Music;
    if (data.musicId) {
      tune = await this.musicService.findById(data.musicId);
    } else if (data.songId) {
      tune = await this.songsSerivce.findById(data.musicId);
    } else {
      return null;
    }
    const favorite = await this.findById(favoriteId);

    const track = await this.tracksService.pushToFavorite(tune, favorite);
    return track;
  }
  async removeFavoriteItem(itemId: number) {
    const favorite = this.tracksService.remove(itemId);
    return favorite;
  }
}
