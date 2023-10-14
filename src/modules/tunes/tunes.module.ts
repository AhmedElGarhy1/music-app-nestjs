import { Module } from '@nestjs/common';
import { TunesService } from './tunes.service';
import { TunesController } from './tunes.controller';

@Module({
  controllers: [TunesController],
  providers: [TunesService]
})
export class TunesModule {}
