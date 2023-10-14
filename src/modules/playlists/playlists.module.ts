import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TracksModule } from '../tracks/tracks.module';
import { TunesModule } from '../tunes/tunes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), TracksModule, TunesModule],
  providers: [PlaylistsService],
  controllers: [PlaylistsController],
})
export class PlaylistsModule {}
