import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musician } from './entities/musician.entity';
import { MusiciansController } from './musicians.controller';
import { MusiciansService } from './musicians.service';
import { AwsModule } from 'src/common/modules/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Musician]), AwsModule],
  controllers: [MusiciansController],
  providers: [MusiciansService],
  exports: [MusiciansService],
})
export class MusiciansModule {}
