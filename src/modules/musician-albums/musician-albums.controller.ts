import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MusicianAlbumsService } from './musician-albums.service';
import { CreateMusicianAlbumDto } from './dto/create-musician-album.dto';
import { UpdateMusicianAlbumDto } from './dto/update-musician-album.dto';
import { MusiciansService } from '../musicians/musicians.service';
import { IMusicianAlbumsController } from './interfaces/IMusicianAlbumsController';

@Controller('musician-albums')
export class MusicianAlbumsController implements IMusicianAlbumsController {
  constructor(
    private musicianAlbumsService: MusicianAlbumsService,
    private musiciansService: MusiciansService,
  ) {}

  @Post()
  async create(@Body() musicianAlbumData: CreateMusicianAlbumDto) {
    // check if musician exists
    if (musicianAlbumData.musicianId)
      await this.musiciansService.findById(musicianAlbumData.musicianId);

    const musicianAlbum = this.musicianAlbumsService.create(musicianAlbumData);
    return musicianAlbum;
  }

  @Get()
  async getAll() {
    const musicianAlbums = await this.musicianAlbumsService.findAll();
    return musicianAlbums;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const musicianAlbum = await this.musicianAlbumsService.findById(+id);

    return musicianAlbum;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() musicianAlbumData: UpdateMusicianAlbumDto,
  ) {
    // check if musician exists
    if (musicianAlbumData.musicianId)
      await this.musiciansService.findById(musicianAlbumData.musicianId);

    const musicianAlbum = await this.musicianAlbumsService.updateById(
      +id,
      musicianAlbumData,
    );

    return musicianAlbum;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const musicianAlbum = await this.musicianAlbumsService.deleteById(+id);

    return musicianAlbum;
  }
}
