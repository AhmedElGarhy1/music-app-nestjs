import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksModule } from '../tracks/tracks.module';
import { MusicModule } from '../music/music.module';
import { SongsModule } from '../songs/songs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    TracksModule,
    SongsModule,
    MusicModule,
  ],
  providers: [FavoritesService],
  exports: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
