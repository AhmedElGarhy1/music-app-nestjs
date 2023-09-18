import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSongAlbumDto } from './dto/create-song-album.dto';
import { UpdateSongAlbumDto } from './dto/update-song-album.dto';
import { CreateSongDto } from './dto/create-song.dto';
import { SingersService } from './singers.service';

@Controller('singers')
export class SingersController {
  constructor(private singersService: SingersService) {}

  @Post()
  async create(@Body() songData: CreateSongDto) {
    const singer = this.singersService.create(songData);
    return singer;
  }

  @Post(':id/album')
  async createAlbum(
    @Param('id') id: string,
    @Body() mucitionAlbumData: CreateSongAlbumDto,
  ) {
    return 'album created';
  }

  @Get()
  async getAll() {
    const singers = await this.singersService.findAll();
    return singers;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const singer = await this.singersService.findById(+id);
    return singer;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() mucitionAlbumData: UpdateSongAlbumDto,
  ) {
    return 'update one ' + id;
  }
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return ' deleted ' + id;
  }
}
