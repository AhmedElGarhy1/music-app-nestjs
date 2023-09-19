import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerAlbum } from './entities/singer-album.entity';
import { SingerAlbumsService } from './singer-albums.service';
import { SingerAlbumsController } from './singer-albums.controller';
import { SingersModule } from '../singers/singers.module';

@Module({
  imports: [TypeOrmModule.forFeature([SingerAlbum]), SingersModule],
  providers: [SingerAlbumsService],
  controllers: [SingerAlbumsController],
  exports: [SingerAlbumsService],
})
export class SingerAlbumsModule {}
