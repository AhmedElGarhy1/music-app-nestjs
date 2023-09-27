import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicianAlbum } from './entities/musician-album.entity';
import { Repository } from 'typeorm';
import { CreateMusicianAlbumDto } from './dto/create-musician-album.dto';
import { UpdateMusicianAlbumDto } from './dto/update-musician-album.dto';
import { IMusicianAlbumsService } from './interfaces/IMusicianAlbumsService';
import { MusiciansService } from '../musicians/musicians.service';
import { AwsFolderEnum } from 'src/common/enums/aws-folder.enum';
import { AwsService } from 'src/common/modules/aws/aws.service';

@Injectable()
export class MusicianAlbumsService implements IMusicianAlbumsService {
  constructor(
    @InjectRepository(MusicianAlbum)
    private readonly repo: Repository<MusicianAlbum>,
    private readonly musiciansService: MusiciansService,
    private readonly awsService: AwsService,
  ) {}

  async create(data: CreateMusicianAlbumDto) {
    // check if musician exists
    const musician = await this.musiciansService.findById(data.musicianId);

    await this.checkUniqueness(data.name, data.musicianId);

    // upload image
    if (data.image) {
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.MUSICIAN_ALBUM_IMAGES,
      );
      data.image = imagePath;
    } else {
      data.image = musician.image;
    }

    const musicianAlbum = this.repo.create(data);
    return await this.repo.save(musicianAlbum);
  }

  async findAll() {
    const musicianAlbums = await this.repo.find();
    return musicianAlbums;
  }

  async findById(id: number) {
    const musicianAlbum = await this.repo.findOne({
      id: id,
    });
    if (!musicianAlbum)
      throw new NotFoundException("This musicianAlbum doesn't existes");

    return musicianAlbum;
  }

  async updateById(id: number, data: UpdateMusicianAlbumDto) {
    // check if musician exists
    if (data.musicianId) await this.musiciansService.findById(data.musicianId);

    const musicianAlbum = await this.findById(id);

    await this.checkUniqueness(
      data.name,
      data.musicianId || musicianAlbum.musicianId,
    );

    if (data.image) {
      if (musicianAlbum.image) {
        await this.awsService.deleteFile(musicianAlbum.image);
      }
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.SINGER_IMAGES,
      );
      data.image = imagePath;
    }

    Object.assign(musicianAlbum, data);
    return await this.repo.save(musicianAlbum);
  }

  async deleteById(id: number) {
    const musicianAlbum = await this.findById(id);

    const deletedMusicianAlbum = await this.repo.remove(musicianAlbum);
    await this.repo.save(deletedMusicianAlbum);
    if (deletedMusicianAlbum.image) {
      await this.awsService.deleteFile(deletedMusicianAlbum.image);
    }
    return deletedMusicianAlbum;
  }

  // helpers
  private async checkUniqueness(name: string, musicianId: number) {
    const musician = await this.repo.findOne({ musicianId, name });

    if (musician && name === musician.name)
      throw new BadRequestException(
        `musician can't have more than one album with the same name`,
      );
  }
}
