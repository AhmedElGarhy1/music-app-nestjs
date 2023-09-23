import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { IMusicService } from './interfaces/IMusicService';

@Injectable()
export class MusicService implements IMusicService {
  constructor(@InjectRepository(Music) private repo: Repository<Music>) {}

  async create(data: CreateMusicDto) {
    await this.checkUniqeness(data.name, data.source);

    const music = this.repo.create(data);
    return this.repo.save(music);
  }

  async deleteById(id: number) {
    // thorw error if not exists
    const music = await this.findById(id);

    const deletedMusic = await this.repo.remove(music);
    return this.repo.save(deletedMusic);
  }

  async findAll() {
    const music = await this.repo.find();
    return music;
  }

  async findById(id: number) {
    const music = await this.repo.findOne({
      id,
    });
    if (!music) throw new NotFoundException("this music doens't exists");

    return music;
  }

  async updateById(id: number, data: UpdateMusicDto) {
    // thorw error if not exists
    const music = await this.findById(id);
    await this.checkUniqeness(
      data.name || music.name,
      data.source || music.source,
    );

    Object.assign(music, data);
    return this.repo.save(music);
  }

  private async checkUniqeness(name: string, source: string) {
    const music = await this.repo.findOne({ name, source });
    if (music)
      throw new BadRequestException(
        'there are a music that have the same source and name',
      );
  }
}
