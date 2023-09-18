import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMusicianAlbumDto } from './dtos/create-musician-album.dto';
import { UpdateMusicianAlbumDto } from './dtos/update-musician-album.dto';

@Controller('musicians')
export class MusiciansController {
  @Post()
  create() {
    return 'musician created';
  }

  @Post(':id/album')
  createAlbum(
    @Param('id') id: string,
    @Body() mucitionAlbumData: CreateMusicianAlbumDto,
  ) {
    const {} = mucitionAlbumData;
    return 'album created';
  }

  @Get()
  getAll() {
    return 'get all';
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return 'get one ' + id;
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() mucitionAlbumData: UpdateMusicianAlbumDto,
  ) {
    return 'update one ' + id;
  }
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return ' deleted ' + id;
  }
}
