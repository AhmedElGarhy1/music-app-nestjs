import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicService } from './music.service';
import { MusicianAlbumsService } from '../musician-albums/musician-albums.service';

@Controller('music')
export class MusicController implements MusicController {
  constructor(
    private musicService: MusicService,
    private musicianAlbumService: MusicianAlbumsService,
  ) {}

  @Post()
  async create(@Body() musicData: CreateMusicDto) {
    // check if album exists
    if (musicData.musicianAlbumId)
      await this.musicianAlbumService.findById(musicData.musicianAlbumId);

    const music = await this.musicService.create(musicData);
    return music;
  }

  @Get()
  async getAll() {
    const music = await this.musicService.findAll();

    return music;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const music = await this.musicService.findById(+id);

    return music;
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() musicData: UpdateMusicDto) {
    // check if album exists
    if (musicData.musicianAlbumId)
      await this.musicianAlbumService.findById(musicData.musicianAlbumId);

    const music = await this.musicService.updateById(+id, musicData);
    return music;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const music = await this.musicService.deleteById(+id);

    return music;
  }
}
