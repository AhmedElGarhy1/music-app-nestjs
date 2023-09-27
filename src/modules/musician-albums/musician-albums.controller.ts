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
import { MusicianAlbumsService } from './musician-albums.service';
import { CreateMusicianAlbumDto } from './dto/create-musician-album.dto';
import { UpdateMusicianAlbumDto } from './dto/update-musician-album.dto';
import { IMusicianAlbumsController } from './interfaces/IMusicianAlbumsController';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('musician-albums')
export class MusicianAlbumsController implements IMusicianAlbumsController {
  constructor(private musicianAlbumsService: MusicianAlbumsService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() musicianAlbumData: CreateMusicianAlbumDto,
    @UploadedFile() image: any,
  ) {
    musicianAlbumData.image = image;
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

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() musicianAlbumData: UpdateMusicianAlbumDto,
    @UploadedFile() image: string,
  ) {
    if (image) musicianAlbumData.image = image;

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
