import { Module } from '@nestjs/common';
import { ArtistAlbumsService } from './artist-albums.service';
import { ArtistAlbumsController } from './artist-albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistAlbum } from './entities/artist-album.entity';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistAlbum]), ArtistsModule],
  controllers: [ArtistAlbumsController],
  providers: [ArtistAlbumsService],
  exports: [ArtistAlbumsService],
})
export class ArtistAlbumsModule {}
