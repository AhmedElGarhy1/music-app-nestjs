import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MusicianAlbumsModule } from '../musician-albums/musician-albums.module';

@Module({
  imports: [TypeOrmModule.forFeature([Music]), MusicianAlbumsModule],
  controllers: [MusicController],
  providers: [MusicService],
  exports: [MusicService],
})
export class MusicModule {}
