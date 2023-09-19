import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { SingerAlbumsService } from './../singer-albums/singer-albums.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ISongsController } from './interfaces/ISongsController';

@Controller('songs')
export class SongsController implements ISongsController {
  constructor(
    private songsService: SongsService,
    private singerAlbumsService: SingerAlbumsService,
  ) {}

  @Post()
  async create(@Body() songData: CreateSongDto) {
    // check if album exists
    if (songData.singerAlbumId)
      await this.singerAlbumsService.findById(songData.singerAlbumId);

    const song = await this.songsService.create(songData);
    return song;
  }

  @Get()
  async getAll() {
    const songs = await this.songsService.findAll();

    return songs;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const song = await this.songsService.findById(+id);

    return song;
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() songData: UpdateSongDto) {
    // check if album exists
    if (songData.singerAlbumId)
      await this.singerAlbumsService.findById(songData.singerAlbumId);

    const song = await this.songsService.updateById(+id, songData);
    return song;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const song = await this.songsService.deleteById(+id);

    return song;
  }
}
