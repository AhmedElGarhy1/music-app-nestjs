import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistItemDto } from './create-playlist-item.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist) private readonly repo: Repository<Playlist>,
  ) {}

  async findAll(userId: number): Promise<Playlist[]> {
    const playlists = await this.repo.find({ userId });
    return playlists;
  }

  async findById(playlistId: number): Promise<Playlist> {
    const playlist = await this.repo.findOne(playlistId);
    return playlist;
  }

  async create(userId: number, data: CreatePlaylistDto): Promise<Playlist> {
    await this.checkUniqueness(userId, data.name);
    const playlist = this.repo.create({ ...data, userId });

    return await playlist.save();
  }

  async addItem(
    playlistId: number,
    data: CreatePlaylistItemDto,
  ): Promise<Playlist> {
    const playlist = await this.findById(playlistId);
    if (!playlist) return null;
    return playlist;
  }

  async removeItem(playlistId: number, itemId: number): Promise<Playlist> {
    const playlist = await this.findById(playlistId);
    if (!playlist) return null;
    return playlist;
  }

  async deleteOne(playlistId: number): Promise<Playlist> {
    const playlist = await this.findById(playlistId);
    if (!playlist) return null;
    await this.repo.remove(playlist);
    return playlist;
  }

  async checkUniqueness(userId: number, name: string) {
    const playlist = await this.repo.findOne({ userId, name });
    if (playlist)
      throw new BadRequestException(
        'user is already have a playlist with this name',
      );
  }
}
