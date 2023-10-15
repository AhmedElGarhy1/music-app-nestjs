import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ArtistAlbumsService } from './artist-albums.service';
import { CreateArtistAlbumDto } from './dto/create-artist-album.dto';
import { UpdateArtistAlbumDto } from './dto/update-artist-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { AlbumTypeEnum } from './enum/album-type.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('artist-albums')
export class ArtistAlbumsController {
  constructor(private artistAlbumsService: ArtistAlbumsService) {}

  @Get()
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  async getAll(@Query('type') type: AlbumTypeEnum) {
    const artistAlbums = await this.artistAlbumsService.findAll(type);
    return artistAlbums;
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const artistAlbum = await this.artistAlbumsService.findById(+id);

    return artistAlbum;
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  @Roles(RoleEnum.ADMIN)
  async create(
    @Body() artistAlbumData: CreateArtistAlbumDto,
    @UploadedFile() image: any,
  ) {
    artistAlbumData.image = image;
    const artistAlbum = this.artistAlbumsService.create(artistAlbumData);
    return artistAlbum;
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
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
  @Roles(RoleEnum.ADMIN)
  async remove(@Param('id') id: string) {
    const artistAlbum = await this.artistAlbumsService.deleteById(+id);

    return artistAlbum;
  }
}
