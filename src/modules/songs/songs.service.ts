import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBaseService } from 'src/common/interfaces/BaseService';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ISongsService } from './interfaces/ISongsService';

@Injectable()
export class SongsService implements ISongsService {
  constructor(@InjectRepository(Song) private repo: Repository<Song>) {}

  async create(data: CreateSongDto) {
    await this.checkUniqeness(data.name, data.source);

    const song = this.repo.create(data);
    return this.repo.save(song);
  }

  async deleteById(id: number) {
    // thorw error if not exists
    const song = await this.findById(id);

    const deletedSong = await this.repo.remove(song);
    return this.repo.save(deletedSong);
  }

  async findAll() {
    const songs = await this.repo.find();
    return songs;
  }

  async findById(id: number) {
    const song = await this.repo.findOne({
      id,
    });
    if (!song) throw new NotFoundException("this song doens't exists");

    return song;
  }

  async updateById(id: number, data: UpdateSongDto) {
    // thorw error if not exists
    const song = await this.findById(id);
    await this.checkUniqeness(
      data.name || song.name,
      data.source || song.source,
    );

    Object.assign(song, data);
    return this.repo.save(song);
  }

  private async checkUniqeness(name: string, source: string) {
    const song = await this.repo.findOne({ name, source });
    if (song)
      throw new BadRequestException(
        'there are a song that have the same source and name',
      );
  }
}
