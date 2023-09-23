import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IMusiciansController } from './interfaces/IMusiciansController';
import { CreateMusicianDto } from './dto/create-musician.dto';
import { UpdateMusicianDto } from './dto/update-musician.dto';
import { MusiciansService } from './musicians.service';

@Controller('musicians')
export class MusiciansController implements IMusiciansController {
  constructor(private musiciansService: MusiciansService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() musicData: CreateMusicianDto,
    @UploadedFile() image: any,
  ) {
    console.log(image);
    musicData.image = image;
    const musician = await this.musiciansService.create(musicData);
    return musician;
  }

  @Get()
  async getAll() {
    const musicians = await this.musiciansService.findAll();
    return musicians;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const musician = await this.musiciansService.findById(+id);

    return musician;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() musicData: UpdateMusicianDto,
  ) {
    const musician = await this.musiciansService.updateById(+id, musicData);

    return musician;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const musician = await this.musiciansService.deleteById(+id);
    return musician;
  }
}
