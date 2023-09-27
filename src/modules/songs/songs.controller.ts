import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ISongsController } from './interfaces/ISongsController';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('songs')
export class SongsController implements ISongsController {
  constructor(private songsService: SongsService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(@Body() songData: CreateSongDto, @UploadedFile() image: any) {
    songData.image = image;
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

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() songData: UpdateSongDto, @UploadedFile() image: any) {
    if (image) {
      songData.image = image;
    }
    const song = await this.songsService.updateById(+id, songData);
    return song;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const song = await this.songsService.deleteById(+id);

    return song;
  }
}
