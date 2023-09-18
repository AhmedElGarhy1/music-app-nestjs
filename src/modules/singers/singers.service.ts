import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Singer } from './entities/singer.entity';
import { Repository } from 'typeorm';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SingersService {
  constructor(@InjectRepository(Singer) private repo: Repository<Singer>) {}

  async create(data: CreateSongDto) {
    const singer = this.repo.create(data);
    return await this.repo.save(singer);
  }

  async findAll() {
    const singers = await this.repo.find();
    return singers;
  }

  async findById(id: number) {
    const singer = await this.repo.find({
      id: id,
    });

    return singer;
  }

  async updateById(id: number, data: UpdateSongDto) {
    const singer = await this.findById(id);
    if (!singer) return null;

    Object.assign(singer, data);
    return await this.repo.save(singer);
  }

  async deleteById(id: number) {
    const singer = await this.findById(id);
    if (!singer) return null;

    const deletedSinger = await this.repo.remove(singer);
    return await this.repo.save(deletedSinger);
  }
}
