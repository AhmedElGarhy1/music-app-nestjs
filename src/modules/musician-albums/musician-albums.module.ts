import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianAlbum } from './entities/musician-album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicianAlbum])],
})
export class MusicianAlbumsModule {}
