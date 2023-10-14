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
import { ArtistAlbumsService } from './artist-albums.service';
import { CreateArtistAlbumDto } from './dto/create-artist-album.dto';
import { UpdateArtistAlbumDto } from './dto/update-artist-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('artist-albums')
export class ArtistAlbumsController {
  constructor(private artistAlbumsService: ArtistAlbumsService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() artistAlbumData: CreateArtistAlbumDto,
    @UploadedFile() image: any,
  ) {
    artistAlbumData.image = image;
    const artistAlbum = this.artistAlbumsService.create(artistAlbumData);
    return artistAlbum;
  }

  @Get()
  async getAll() {
    const artistAlbums = await this.artistAlbumsService.findAll();
    return artistAlbums;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const artistAlbum = await this.artistAlbumsService.findById(+id);

    return artistAlbum;
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() artistAlbumData: UpdateArtistAlbumDto,
    @UploadedFile() image: any,
  ) {
    if (image) {
      artistAlbumData.image = image;
    }

    const artistAlbum = await this.artistAlbumsService.updateById(
      +id,
      artistAlbumData,
    );

    return artistAlbum;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const artistAlbum = await this.artistAlbumsService.deleteById(+id);

    return artistAlbum;
  }
}
