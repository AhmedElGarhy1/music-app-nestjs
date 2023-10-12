import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

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

  async findById(id: number) {
    const favorite = this.repo.findOne();
    return favorite;
  }

  async addFavoriteItem(favoriteId: number, data: CreateFavoriteDto) {
    const favorite = this.repo.findOne();
    return favorite;
  }
  async removeFavoriteItem(favoriteId: number, itemId: number) {
    const favorite = this.repo.findOne();
    return favorite;
  }
}
