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
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsService } from './artists.service';
import { RoleEnum } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ArtistEnum } from 'src/common/enums/artist-type.enum';

@Controller('artists')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN)
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(@Body() tuneData: CreateArtistDto, @UploadedFile() image: any) {
    tuneData.image = image;
    const artist = await this.artistsService.create(tuneData);
    return artist;
  }

  @Get()
  async getAll(@Query('type') type: ArtistEnum) {
    const artists = await this.artistsService.findAll(type);
    return artists;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const artist = await this.artistsService.findById(+id);

    return artist;
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() tuneData: UpdateArtistDto,
    @UploadedFile() image: any,
  ) {
    if (image) {
      tuneData.image = image;
    }
    const artist = await this.artistsService.updateById(+id, tuneData);

    return artist;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const artist = await this.artistsService.deleteById(+id);
    return artist;
  }
}
