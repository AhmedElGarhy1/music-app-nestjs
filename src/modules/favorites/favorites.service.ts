import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private readonly repo: Repository<Favorite>,
  ) {}

  async create() {
    const favoriteInstance = this.repo.create();
    const favorite = this.repo.save(favoriteInstance);
    return favorite;
  }

  // async addFavoriteListItem(): Promise<Favorite> {

  // }

  async getFavoriteListById(favoriteId: number): Promise<Favorite> {
    const favoriteList = await this.repo.findOne(favoriteId);
    return favoriteList;
  }
}
