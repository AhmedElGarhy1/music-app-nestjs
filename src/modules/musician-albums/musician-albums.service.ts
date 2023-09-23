import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicianAlbum } from './entities/musician-album.entity';
import { Repository } from 'typeorm';
import { CreateMusicianAlbumDto } from './dto/create-musician-album.dto';
import { UpdateMusicianAlbumDto } from './dto/update-musician-album.dto';
import { IMusicianAlbumsService } from './interfaces/IMusicianAlbumsService';

@Injectable()
export class MusicianAlbumsService implements IMusicianAlbumsService {
  constructor(
    @InjectRepository(MusicianAlbum) private repo: Repository<MusicianAlbum>,
  ) {}

  async create(data: CreateMusicianAlbumDto) {
    await this.checkUniqueness(data.name, data.musicianId);

    const musicianAlbum = this.repo.create(data);
    return await this.repo.save(musicianAlbum);
  }

  async findAll() {
    const musicianAlbums = await this.repo.find();
    return musicianAlbums;
  }

  async findById(id: number) {
    const musicianAlbum = await this.repo.findOne({
      id: id,
    });
    if (!musicianAlbum)
      throw new NotFoundException("This musicianAlbum doesn't existes");

    return musicianAlbum;
  }

  async updateById(id: number, data: UpdateMusicianAlbumDto) {
    const musicianAlbum = await this.findById(id);

    await this.checkUniqueness(
      data.name,
      data.musicianId || musicianAlbum.musicianId,
    );

    Object.assign(musicianAlbum, data);
    return await this.repo.save(musicianAlbum);
  }

  async deleteById(id: number) {
    const musicianAlbum = await this.findById(id);

    const deletedMusicianAlbum = await this.repo.remove(musicianAlbum);
    return await this.repo.save(deletedMusicianAlbum);
  }

  // helpers
  private async checkUniqueness(name: string, musicianId: number) {
    const musician = await this.repo.findOne({ musicianId, name });

    if (musician && name === musician.name)
      throw new BadRequestException(
        `musician can't have more than one album with the same name`,
      );
  }
}
