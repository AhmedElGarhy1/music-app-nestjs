import {
  Controller,
  Param,
  Get,
  Body,
  Delete,
  Post,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { Playlist } from './entities/playlist.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from '../tracks/entities/track.entity';

@Controller('playlists')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlaylistsController {
  constructor(private readonly playlistsSerive: PlaylistsService) {}

  @Get()
  @Roles(RoleEnum.USER)
  async findAll(@CurrentUser() user: User): Promise<Playlist[]> {
    const playlists = await this.playlistsSerive.findAll(user.id);
    return playlists;
  }

  @Get(':id')
  @Roles(RoleEnum.USER)
  async findOne(@Param('id') playlistId: number): Promise<Playlist> {
    const playlist = await this.playlistsSerive.findById(playlistId);
    return playlist;
  }

  @Post()
  @Roles(RoleEnum.USER)
  async create(
    @CurrentUser() user: User,
    @Body() data: CreatePlaylistDto,
  ): Promise<Playlist> {
    const playlist = await this.playlistsSerive.create(user.id, data);
    if (!playlist) throw new NotFoundException(`can't find the playlist`);
    return playlist;
  }

  @Post(':id/item')
  @Roles(RoleEnum.USER)
  async addItem(
    @Param('id') playlistId: number,
    @Body() data: CreateTrackDto,
  ): Promise<Track> {
    const track = await this.playlistsSerive.addItem(playlistId, data);
    if (!track) throw new NotFoundException(`can't find the playlist`);
    return track;
  }

  @Delete(':id')
  @Roles(RoleEnum.USER)
  async deleteOne(
    @CurrentUser() user: User,
    @Param('id') playlistId: number,
  ): Promise<Playlist> {
    const playlist = await this.playlistsSerive.remove(playlistId);
    if (!playlist) throw new NotFoundException(`can't find the playlist`);
    return playlist;
  }

  @Delete(':id/item/:itemId')
  @Roles(RoleEnum.USER)
  async removeItem(
    @CurrentUser() user: User,
    @Param('id') playlistId: number,
    @Param('itemId') itemId: number,
  ): Promise<Track> {
    const playlist = await this.playlistsSerive.removeItem(itemId);
    if (!playlist) throw new NotFoundException(`can't find the playlist`);
    return playlist;
  }
}
