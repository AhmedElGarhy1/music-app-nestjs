import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist) private readonly repo: Repository<Playlist>,
  ) {}

  async findById(id: number) {
    const playlist = await this.repo.findOne(id);
    return playlist;
  }

  async findAll(userId: number) {
    const playlists = await this.repo.find({ userId });
    return playlists;
  }

  async create(userId: number, data: CreatePlaylistDto) {
    await this.checkUniqueness(userId, data.name);

    const playlist = this.repo.create({ ...data, userId });
    return this.repo.save(playlist);
  }

  async update(userId: number, playlistId: number, data: UpdatePlaylistDto) {
    if (data.name) {
      await this.checkUniqueness(userId, data.name);
    }

    const playlist = this.repo.create({ ...data, userId });
    return this.repo.save(playlist);
  }

  async checkUniqueness(userId: number, name: string) {
    const playlist = await this.repo.findOne({ userId, name });

    if (playlist)
      throw new BadRequestException(
        'The User have already playlist with the same name',
      );
  }
}
