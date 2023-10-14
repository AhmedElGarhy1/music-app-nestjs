import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlists')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.USER)
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() playlistDto: CreatePlaylistDto,
  ) {
    const playlist = await this.playlistsService.create(user.id, playlistDto);
    return playlist;
  }

  @Get()
  async getAll(@CurrentUser() user: User) {
    const playlist = await this.playlistsService.findAll(user.id);
    return playlist;
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const playlist = await this.playlistsService.findById(id);
    return playlist;
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: User,
    @Param('id') playlistId: number,
    playlistDto: UpdatePlaylistDto,
  ) {
    const playlist = await this.playlistsService.update(
      user.id,
      playlistId,
      playlistDto,
    );
    return playlist;
  }

  @Delete(':id')
  async deleteOne(@CurrentUser() user: User) {}
}
