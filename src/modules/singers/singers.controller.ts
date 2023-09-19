import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SingersService } from './singers.service';
import { CreateSingerDto } from './dto/create-singer.dto';
import { UpdateSingerDto } from './dto/update-singer.dto';
import { ISingersController } from './interfaces/ISingersController';

@Controller('singers')
export class SingersController implements ISingersController {
  constructor(private singersService: SingersService) {}

  @Post()
  async create(@Body() songData: CreateSingerDto) {
    const singer = this.singersService.create(songData);
    return singer;
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
  async updateOne(@Param('id') id: string, @Body() songData: UpdateSingerDto) {
    const singer = await this.singersService.updateById(+id, songData);

    return singer;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const singer = await this.singersService.deleteById(+id);
    return singer;
  }
}
