import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { SingerAlbumsModule } from '../singer-albums/singer-albums.module';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), SingerAlbumsModule],
  controllers: [SongsController],
  providers: [SongsService],
  exports: [SongsService],
})
export class SongsModule {}
