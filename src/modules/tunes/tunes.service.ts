import { Injectable } from '@nestjs/common';
import { CreateTuneDto } from './dto/create-tune.dto';
import { UpdateTuneDto } from './dto/update-tune.dto';

@Injectable()
export class TunesService {
  create(createTuneDto: CreateTuneDto) {
    return 'This action adds a new tune';
  }

  findAll() {
    return `This action returns all tunes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tune`;
  }

  update(id: number, updateTuneDto: UpdateTuneDto) {
    return `This action updates a #${id} tune`;
  }

  remove(id: number) {
    return `This action removes a #${id} tune`;
  }
}
