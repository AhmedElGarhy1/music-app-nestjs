import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Singer } from './entities/singer.entity';
import { SingersController } from './singers.controller';
import { SingersService } from './singers.service';
import { AwsModule } from 'src/common/modules/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Singer])],
  controllers: [SingersController],
  providers: [SingersService],
  exports: [SingersService],
})
export class SingersModule {}
