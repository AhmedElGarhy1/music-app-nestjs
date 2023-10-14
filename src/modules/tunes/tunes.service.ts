import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tune } from './entities/tune.entity';
import { Repository } from 'typeorm';
import { CreateTuneDto } from './dto/create-tune.dto';
import { UpdateTuneDto } from './dto/update-tune.dto';
import { AwsService } from 'src/common/modules/aws/aws.service';
import { AwsFolderEnum } from 'src/common/enums/aws-folder.enum';
import { ArtistAlbumsService } from '../artist-albums/artist-albums.service';
import { TuneTypeEnum } from 'src/common/enums/tune-type.enum';
import { AlbumTypeEnum } from '../artist-albums/enum/album-type.enum';

@Injectable()
export class TunesService {
  constructor(
    @InjectRepository(Tune) private repo: Repository<Tune>,
    private readonly artistAlbumsService: ArtistAlbumsService,
    private readonly awsService: AwsService,
  ) {}

  async create(data: CreateTuneDto) {
    // check if album exists
    const artistAlbum = await this.artistAlbumsService.findById(
      data.artistAlbumId,
    );
    await this.checkUniqueness(data.name, data.source);

    if (data.type === TuneTypeEnum.SONG) {
      if (artistAlbum.type !== AlbumTypeEnum.SINGER_ALBUM) {
        throw new BadRequestException('Song must put in singerAlbum');
      }
      data.tuneType = data.songType;
    }

    if (data.type === TuneTypeEnum.MUSIC) {
      if (artistAlbum.type !== AlbumTypeEnum.MUSICIAN_ALBUM) {
        throw new BadRequestException('music must put in musicianAlbum');
      }
      data.tuneType = data.musicType;
    }

    if (data.image) {
      // upload image
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.TUNE_IMAGES,
      );
      data.image = imagePath;
    } else {
      data.image = artistAlbum.image;
    }

    const tune = this.repo.create(data);
    return this.repo.save(tune);
  }

  async findAll() {
    const tune = await this.repo.find();
    return tune;
  }

  async findOne(id: number) {
    const tune = await this.repo.findOne({
      id,
    });
    if (!tune) throw new NotFoundException("this tune doens't exists");

    return tune;
  }

  async update(id: number, data: UpdateTuneDto) {
    // check if album exists
    if (data.artistAlbumId)
      await this.artistAlbumsService.findById(data.artistAlbumId);

    // thorw error if not exists
    const tune = await this.findOne(id);
    await this.checkUniqueness(
      data.name || tune.name,
      data.source || tune.source,
    );

    if (data.image) {
      if (tune.image) {
        await this.awsService.deleteFile(tune.image);
      }
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.SONG_IMAGES,
      );
      data.image = imagePath;
    }

    Object.assign(tune, data);
    return this.repo.save(tune);
  }

  async remove(id: number) {
    // thorw error if not exists
    const tune = await this.findOne(id);

    const deletedTune = await this.repo.remove(tune);
    await this.repo.save(deletedTune);
    if (deletedTune.image) {
      await this.awsService.deleteFile(deletedTune.image);
    }
  }

  private async checkUniqueness(name: string, source: string) {
    const tune = await this.repo.findOne({ name, source });
    if (tune)
      throw new BadRequestException(
        'there are a tune that have the same source and name',
      );
  }
}
