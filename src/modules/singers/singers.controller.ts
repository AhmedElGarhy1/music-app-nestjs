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
import { SingersService } from './singers.service';
import { CreateSingerDto } from './dto/create-singer.dto';
import { UpdateSingerDto } from './dto/update-singer.dto';
import { ISingersController } from './interfaces/ISingersController';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('singers')
export class SingersController implements ISingersController {
  constructor(private singersService: SingersService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(@Body() songData: CreateSingerDto, @UploadedFile() image: any) {
    songData.image = image;
    const singer = await this.singersService.create(songData);
    return singer;
  }

  @Get()
  async getAll() {
    const singers = await this.singersService.findAll();
    return singers;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const singer = await this.singersService.findById(+id);
    return singer;
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() songData: UpdateSingerDto,
    @UploadedFile() image: any,
  ) {
    if (image) {
      songData.image = image;
    }

    const singer = await this.singersService.updateById(+id, songData);
    return singer;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const singer = await this.singersService.deleteById(+id);
    return singer;
  }
}
