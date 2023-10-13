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

import { FileInterceptor } from '@nestjs/platform-express';
import { TunesService } from './tunes.service';
import { CreateTuneDto } from './dto/create-tune.dto';
import { UpdateTuneDto } from './dto/update-tune.dto';

@Controller('tunes')
export class TunesController {
  constructor(private tunesService: TunesService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(@Body() tuneData: CreateTuneDto, @UploadedFile() image: any) {
    tuneData.image = image;
    const tune = await this.tunesService.create(tuneData);
    return tune;
  }

  @Get()
  async getAll() {
    const tunes = await this.tunesService.findAll();

    return tunes;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tune = await this.tunesService.findOne(+id);

    return tune;
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() tuneData: UpdateTuneDto,
    @UploadedFile() image: any,
  ) {
    if (image) {
      tuneData.image = image;
    }
    const tune = await this.tunesService.update(+id, tuneData);
    return tune;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const tune = await this.tunesService.remove(+id);

    return tune;
  }
}
