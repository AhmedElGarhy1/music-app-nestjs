import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { TracksService } from '../tracks/tracks.service';
import { TunesService } from '../tunes/tunes.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private readonly repo: Repository<Favorite>,
    private readonly tracksService: TracksService,
    private readonly tunesService: TunesService,
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
    const tune = await this.tunesService.findOne(data.tuneId);
    const favorite = await this.findById(favoriteId);

    const track = await this.tracksService.pushToFavorite(tune, favorite);
    return track;
  }
  async removeFavoriteItem(itemId: number) {
    const favorite = this.tracksService.remove(itemId);
    return favorite;
  }
}
