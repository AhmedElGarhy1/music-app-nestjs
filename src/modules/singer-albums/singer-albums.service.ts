import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingerAlbum } from './entities/singer-album.entity';
import { Repository } from 'typeorm';
import { CreateSingerAlbumDto } from './dto/create-singer-album.dto';
import { UpdateSingerAlbumDto } from './dto/update-singer-album.dto';
import { IBaseService } from 'src/common/interfaces/BaseService';
import { ISingerAlbumsService } from './interfaces/ISingerAlbumsService';
import { AwsFolderEnum } from 'src/common/enums/aws-folder.enum';
import { AwsService } from 'src/common/modules/aws/aws.service';
import { SingersService } from '../singers/singers.service';

@Injectable()
export class SingerAlbumsService implements ISingerAlbumsService {
  constructor(
    @InjectRepository(SingerAlbum)
    private readonly repo: Repository<SingerAlbum>,
    private readonly singersService: SingersService,
    private readonly awsService: AwsService,
  ) {}

  async create(data: CreateSingerAlbumDto) {
    // check if singer exists
    const singer = await this.singersService.findById(data.singerId);
    // check uniqueness
    await this.checkUniqueness(data.name, data.singerId);

    // upload image
    if (data.image) {
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.SINGER_ALBUM_IMAGES,
      );
      data.image = imagePath;
    } else {
      data.image = singer.image;
    }

    const singerAlbum = this.repo.create(data);
    return await this.repo.save(singerAlbum);
  }

  async findAll() {
    const singerAlbums = await this.repo.find();
    return singerAlbums;
  }

  async findById(id: number) {
    const singerAlbum = await this.repo.findOne({
      id: id,
    });
    if (!singerAlbum)
      throw new NotFoundException("This singerAlbum doesn't existes");

    return singerAlbum;
  }

  async updateById(id: number, data: UpdateSingerAlbumDto) {
    // check if singer exists
    if (data.singerId) await this.singersService.findById(data.singerId);
    const singerAlbum = await this.findById(id);
    await this.checkUniqueness(
      data.name,
      data.singerId || singerAlbum.singerId,
    );

    if (data.image) {
      if (singerAlbum.image) {
        await this.awsService.deleteFile(singerAlbum.image);
      }
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.SINGER_IMAGES,
      );
      data.image = imagePath;
    }

    Object.assign(singerAlbum, data);
    return await this.repo.save(singerAlbum);
  }

  async deleteById(id: number) {
    const singerAlbum = await this.findById(id);

    const deletedSingerAlbum = await this.repo.remove(singerAlbum);
    await this.repo.save(deletedSingerAlbum);
    if (deletedSingerAlbum.image) {
      await this.awsService.deleteFile(deletedSingerAlbum.image);
    }
    return deletedSingerAlbum;
  }

  // helpers
  private async checkUniqueness(name: string, singerId: number) {
    const singerAlbum = await this.repo.findOne({ singerId, name });

    if (singerAlbum && name === singerAlbum.name)
      throw new BadRequestException(
        `singer can't have more than one album with the same name`,
      );
  }
}
