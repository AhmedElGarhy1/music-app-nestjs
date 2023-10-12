import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Musician } from './entities/musician.entity';
import { Repository } from 'typeorm';
import { CreateMusicianDto } from './dto/create-musician.dto';
import { UpdateMusicianDto } from './dto/update-musician.dto';
import { IMusiciansService } from './interfaces/IMusiciansService';
import { AwsService } from 'src/common/modules/aws/aws.service';
import { AwsFolderEnum } from 'src/common/enums/aws-folder.enum';

@Injectable()
export class MusiciansService implements IMusiciansService {
  constructor(
    @InjectRepository(Musician) private readonly repo: Repository<Musician>,
    private readonly awsService: AwsService,
  ) {}

  async create(data: CreateMusicianDto) {
    // check if the name is unique
    await this.checkUniqueness(data.name);

    // upload image
    if (data.image) {
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.MUSICIAN_IMAGES,
      );
      data.image = imagePath;
    }

    const musician = this.repo.create(data);
    return await this.repo.save(musician);
  }

  async findAll() {
    const musicians = await this.repo.find();

    return musicians;
  }

  async findById(id: number) {
    // if(!id) return new NotFoundException("This songer doesn't existes");
    const musician = await this.repo.findOne({
      id: id,
    });

    if (!musician) throw new NotFoundException("This songer doesn't existes");
    return musician;
  }

  async updateById(id: number, data: UpdateMusicianDto) {
    const musician = await this.findById(id);
    await this.checkUniqueness(data.name);

    if (data.image) {
      if (musician.image) {
        await this.awsService.deleteFile(musician.image);
      }
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.MUSICIAN_IMAGES,
      );
      data.image = imagePath;
    }

    Object.assign(musician, data);
    return await this.repo.save(musician);
  }

  async deleteById(id: number) {
    const musician = await this.findById(id);

    const deletedMusician = await this.repo.remove(musician);

    await this.repo.save(deletedMusician);
    if (deletedMusician.image) {
      await this.awsService.deleteFile(deletedMusician.image);
    }
    return deletedMusician;
  }

  private async checkUniqueness(name: string) {
    const entity = await this.repo.findOne({ name });
    if (entity) throw new BadRequestException('this name is already exists');
  }
}
