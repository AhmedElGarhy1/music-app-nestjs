import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SingerAlbumsService } from './singer-albums.service';
import { CreateSingerAlbumDto } from './dto/create-singer-album.dto';
import { UpdateSingerAlbumDto } from './dto/update-singer-album.dto';
import { SingersService } from '../singers/singers.service';
import { ISingerAlbumsController } from './interfaces/ISingerAlbumsController';

@Controller('singer-albums')
export class SingerAlbumsController implements ISingerAlbumsController {
  constructor(
    private singerAlbumsService: SingerAlbumsService,
    private singersService: SingersService,
  ) {}

  @Post()
  async create(@Body() singerAlbumData: CreateSingerAlbumDto) {
    // check if singer exists
    if (singerAlbumData.singerId)
      await this.singersService.findById(singerAlbumData.singerId);

    const singerAlbum = this.singerAlbumsService.create(singerAlbumData);
    return singerAlbum;
  }

  // @Post(':id/album')
  // async createAlbum(
  //   @Param('id') id: string,
  //   @Body() mucitionAlbumData: CreateSin,
  // ) {
  //   return 'album created';
  // }

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

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() singerAlbumData: UpdateSingerAlbumDto,
  ) {
    // check if singer exists
    if (singerAlbumData.singerId)
      await this.singersService.findById(singerAlbumData.singerId);

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
