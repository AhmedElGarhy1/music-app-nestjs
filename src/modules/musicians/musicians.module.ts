import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musician } from './entities/musician.entity';
import { MusiciansController } from './musicians.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Musician])],
  controllers: [MusiciansController],
})
export class MusiciansModule {}
