import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingerAlbum } from './entities/singer-album.entity';
import { Repository } from 'typeorm';
import { CreateSingerAlbumDto } from './dto/create-singer-album.dto';
import { UpdateSingerAlbumDto } from './dto/update-singer-album.dto';
import { IBaseService } from 'src/common/interfaces/BaseService';
import { ISingerAlbumsService } from './interfaces/ISingerAlbumsService';

@Injectable()
export class SingerAlbumsService implements ISingerAlbumsService {
  constructor(
    @InjectRepository(SingerAlbum) private repo: Repository<SingerAlbum>,
  ) {}

  async create(data: CreateSingerAlbumDto) {
    await this.checkUniqueness(data.name, data.singerId);

    const singerAlbum = this.repo.create(data);
    return await this.repo.save(singerAlbum);
  }

  async findAll() {
    const singerAlbums = await this.repo.find();
    return singerAlbums;
  }

  async findById(id: number) {
    const singerAlbum = await this.repo.findOne({
      id: id,
    });
    if (!singerAlbum)
      throw new NotFoundException("This singerAlbum doesn't existes");

    return singerAlbum;
  }

  async updateById(id: number, data: UpdateSingerAlbumDto) {
    const singerAlbum = await this.findById(id);

    await this.checkUniqueness(
      data.name,
      data.singerId || singerAlbum.singerId,
    );

    Object.assign(singerAlbum, data);
    return await this.repo.save(singerAlbum);
  }

  async deleteById(id: number) {
    const singerAlbum = await this.findById(id);

    const deletedSingerAlbum = await this.repo.remove(singerAlbum);
    return await this.repo.save(deletedSingerAlbum);
  }

  // helpers
  private async checkUniqueness(name: string, singerId: number) {
    const singer = await this.repo.findOne({ singerId, name });

    if (singer && name === singer.name)
      throw new BadRequestException(
        `singer can't have more than one album with the same name`,
      );
  }
}
