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
import { SingerAlbumsService } from './singer-albums.service';
import { CreateSingerAlbumDto } from './dto/create-singer-album.dto';
import { UpdateSingerAlbumDto } from './dto/update-singer-album.dto';
import { ISingerAlbumsController } from './interfaces/ISingerAlbumsController';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('singer-albums')
export class SingerAlbumsController implements ISingerAlbumsController {
  constructor(private singerAlbumsService: SingerAlbumsService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() singerAlbumData: CreateSingerAlbumDto,
    @UploadedFile() image: any,
  ) {
    singerAlbumData.image = image;
    const singerAlbum = this.singerAlbumsService.create(singerAlbumData);
    return singerAlbum;
  }

  @Get()
  async getAll() {
    const singerAlbums = await this.singerAlbumsService.findAll();
    return singerAlbums;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const singerAlbum = await this.singerAlbumsService.findById(+id);

    return singerAlbum;
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() singerAlbumData: UpdateSingerAlbumDto,
    @UploadedFile() image: any,
  ) {
    if (image) {
      singerAlbumData.image = image;
    }

    const singerAlbum = await this.singerAlbumsService.updateById(
      +id,
      singerAlbumData,
    );

    return singerAlbum;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const singerAlbum = await this.singerAlbumsService.deleteById(+id);

    return singerAlbum;
  }
}
