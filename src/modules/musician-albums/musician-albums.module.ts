import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianAlbum } from './entities/musician-album.entity';
import { MusicianAlbumsService } from './musician-albums.service';
import { MusicianAlbumsController } from './musician-albums.controller';
import { MusiciansModule } from '../musicians/musicians.module';

@Module({
  imports: [TypeOrmModule.forFeature([MusicianAlbum]), MusiciansModule],
  providers: [MusicianAlbumsService],
  controllers: [MusicianAlbumsController],
  exports: [MusicianAlbumsService],
})
export class MusicianAlbumsModule {}
