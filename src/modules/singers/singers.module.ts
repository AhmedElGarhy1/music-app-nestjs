import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Singer } from './entities/singer.entity';
import { SingersController } from './singers.controller';
import { SingersService } from './singers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Singer])],
  controllers: [SingersController],
  providers: [SingersService],
  exports: [SingersService],
})
export class SingersModule {}