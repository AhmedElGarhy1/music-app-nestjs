import { TunesService } from './../tunes/tunes.service';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { TracksService } from '../tracks/tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist) private readonly repo: Repository<Playlist>,
    private readonly tracksService: TracksService,
  ) {}

  async findAll(userId: number): Promise<Playlist[]> {
    const playlists = await this.repo.find({ userId });
    return playlists;
  }

  async findById(playlistId: number): Promise<Playlist> {
    const playlist = await this.repo.findOne(playlistId);
    if (!playlist) throw new NotFoundException('Playlist id not found');
    return playlist;
  }

  async create(userId: number, data: CreatePlaylistDto): Promise<Playlist> {
    await this.checkUniqueness(userId, data.name);
    const playlist = this.repo.create({ ...data, userId });

    return await playlist.save();
  }

  async addItem(playlistId: number, data: CreateTrackDto): Promise<Track> {
    const playlist = await this.findById(playlistId);

    const track = await this.tracksService.pushToPlaylist(
      playlistId,
      data.tuneId,
    );
    return track;
  }

  async removeItem(ItemId: number): Promise<Track> {
    const track = await this.tracksService.remove(ItemId);
    return track;
  }

  async remove(playlistId: number): Promise<Playlist> {
    const playlist = await this.findById(playlistId);
    const ids = playlist.tracks.map((track) => track.id);

    this.tracksService.removeMany(ids);
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
