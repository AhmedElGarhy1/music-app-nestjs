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
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicService } from './music.service';
import { MusicianAlbumsService } from '../musician-albums/musician-albums.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('music')
export class MusicController implements MusicController {
  constructor(private musicService: MusicService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(@Body() musicData: CreateMusicDto, @UploadedFile() image: any) {
    musicData.image = image;

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

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() musicData: UpdateMusicDto,
    @UploadedFile() image: any,
  ) {
    if (image) {
      musicData.image = image;
    }

    const music = await this.musicService.updateById(+id, musicData);
    return music;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const music = await this.musicService.deleteById(+id);

    return music;
  }
}
