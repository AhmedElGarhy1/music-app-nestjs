import { Module } from '@nestjs/common';
import { TunesService } from './tunes.service';
import { TunesController } from './tunes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tune } from './entities/tune.entity';
import { ArtistAlbumsModule } from '../artist-albums/artist-albums.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tune]), ArtistAlbumsModule],
  controllers: [TunesController],
  providers: [TunesService],
  exports: [TunesService],
})
export class TunesModule {}
