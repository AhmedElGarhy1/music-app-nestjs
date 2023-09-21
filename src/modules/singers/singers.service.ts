import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Singer } from './entities/singer.entity';
import { Repository } from 'typeorm';
import { CreateSingerDto } from './dto/create-singer.dto';
import { UpdateSingerDto } from './dto/update-singer.dto';
import { ISingersService } from './interfaces/ISingersService';
import { AwsService } from 'src/common/modules/aws/aws.service';
import { AwsFolderEnum } from 'src/common/enums/aws-folder.enum';

@Injectable()
export class SingersService implements ISingersService {
  constructor(
    @InjectRepository(Singer) private readonly repo: Repository<Singer>,
    private readonly awsService: AwsService,
  ) {}

  async create(data: CreateSingerDto) {
    // check if the name is unique
    await this.checkUniqeness(data.name);

    // upload image
    const imagePath = await this.awsService.uploadFile(
      data.image,
      AwsFolderEnum.SINGER_IMAGES,
    );
    data.image = imagePath;

    const singer = this.repo.create(data);
    return await this.repo.save(singer);
  }

  async findAll() {
    const singers = await this.repo.find();

    return singers;
  }

  async findById(id: number) {
    // if(!id) return new NotFoundException("This songer doesn't existes");
    const singer = await this.repo.findOne({
      id: id,
    });

    if (!singer) throw new NotFoundException("This songer doesn't existes");
    return singer;
  }

  async updateById(id: number, data: UpdateSingerDto) {
    const singer = await this.findById(id);
    await this.checkUniqeness(data.name);

    Object.assign(singer, data);
    return await this.repo.save(singer);
  }

  async deleteById(id: number) {
    const singer = await this.findById(id);

    const deletedSinger = await this.repo.remove(singer);
    return await this.repo.save(deletedSinger);
  }

  private async checkUniqeness(name: string) {
    const entity = await this.repo.findOne({ name });
    if (entity) throw new BadRequestException('this name is already exists');
  }
}
