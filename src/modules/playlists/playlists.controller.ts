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
import { AddPlaylistItemDto } from './dto/add-playlist-item.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Controller('playlists')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.USER)
export class PlaylistsController {
  constructor(private readonly playlistsSerive: PlaylistsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<Playlist[]> {
    const playlists = await this.playlistsSerive.findAll(user.id);
    return playlists;
  }

  @Get(':id')
  async findOne(@Param('id') playlistId: number): Promise<Playlist> {
    const playlist = await this.playlistsSerive.findById(playlistId);
    if (!playlist) throw new NotFoundException(`can't find the playlist`);
    return playlist;
  }

  @Post(':id/item')
  async addItem(
    @Param('id') playlistId: number,
    data: AddPlaylistItemDto,
  ): Promise<Playlist> {
    const playlist = await this.playlistsSerive.addItem(playlistId, data);
    if (!playlist) throw new NotFoundException(`can't find the playlist`);
    return playlist;
  }

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() data: CreatePlaylistDto,
  ): Promise<Playlist> {
    const playlist = await this.playlistsSerive.create(user.id, data);
    if (!playlist) throw new NotFoundException(`can't find the playlist`);
    return playlist;
  }

  @Delete(':id')
  async deleteOne(
    @CurrentUser() user: User,
    @Param('id') playlistId: number,
  ): Promise<Playlist> {
    const playlist = await this.playlistsSerive.deleteOne(playlistId);
    if (!playlist) throw new NotFoundException(`can't find the playlist`);
    return playlist;
  }

  @Delete(':id/item/:itemId')
  async removeItem(
    @CurrentUser() user: User,
    @Param('id') playlistId: number,
    @Param('itemId') itemId: number,
  ): Promise<Playlist> {
    const playlist = await this.playlistsSerive.removeItem(playlistId, itemId);
    if (!playlist) throw new NotFoundException(`can't find the playlist`);
    return playlist;
  }
}
