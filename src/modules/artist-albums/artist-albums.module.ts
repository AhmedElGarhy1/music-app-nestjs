import { Module } from '@nestjs/common';
import { ArtistAlbumsService } from './artist-albums.service';
import { ArtistAlbumsController } from './artist-albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistAlbum } from './entities/artist-album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistAlbum])],
  controllers: [ArtistAlbumsController],
  providers: [ArtistAlbumsService],
})
export class ArtistAlbumsModule {}
