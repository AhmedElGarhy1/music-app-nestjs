import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { MusicService } from '../music/music.service';
import { SongsService } from '../songs/songs.service';
import { TracksService } from '../tracks/tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Song } from '../songs/entities/song.entity';
import { Music } from '../music/entities/music.entity';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist) private readonly repo: Repository<Playlist>,
    private readonly tracksService: TracksService,
    private readonly songsSerivce: SongsService,
    private readonly musicService: MusicService,
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
    let tune: Song | Music;
    if (data.musicId) {
      tune = await this.musicService.findById(data.musicId);
    } else if (data.songId) {
      tune = await this.songsSerivce.findById(data.musicId);
    } else {
      return null;
    }
    const playlist = await this.findById(playlistId);

    const track = await this.tracksService.pushToPlaylist(tune, playlist);
    return track;
  }

  async removeItem(ItemId: number, itemId: number): Promise<Track> {
    const track = await this.tracksService.remove(ItemId);
    return track;
  }

  async deleteOne(playlistId: number): Promise<Playlist> {
    const playlist = await this.findById(playlistId);
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
