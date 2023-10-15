import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { TracksService } from './tracks.service';
import { TunesModule } from '../tunes/tunes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), TunesModule],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
