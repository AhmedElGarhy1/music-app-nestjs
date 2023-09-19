import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Music])],
})
export class MusicModule {}
