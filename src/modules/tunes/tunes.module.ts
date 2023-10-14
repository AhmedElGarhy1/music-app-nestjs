import { Module } from '@nestjs/common';
import { TunesService } from './tunes.service';
import { TunesController } from './tunes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tune } from './entities/tune.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tune])],
  controllers: [TunesController],
  providers: [TunesService],
})
export class TunesModule {}
