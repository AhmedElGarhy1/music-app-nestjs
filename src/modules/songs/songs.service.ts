import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBaseService } from 'src/common/interfaces/BaseService';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ISongsService } from './interfaces/ISongsService';
import { SingerAlbumsService } from '../singer-albums/singer-albums.service';
import { AwsService } from 'src/common/modules/aws/aws.service';
import { AwsFolderEnum } from 'src/common/enums/aws-folder.enum';

@Injectable()
export class SongsService implements ISongsService {
  constructor(
    @InjectRepository(Song) private readonly repo: Repository<Song>,
    private readonly singerAlbumsService: SingerAlbumsService,
    private readonly awsService: AwsService,
  ) {}

  async create(data: CreateSongDto) {
    const singerAlbum = await this.singerAlbumsService.findById(
      data.singerAlbumId,
    );

    // upload image
    if (data.image) {
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.SONG_IMAGES,
      );
      data.image = imagePath;
    } else {
      data.image = singerAlbum.image;
    }

    await this.checkUniqeness(data.name, data.source);

    const song = this.repo.create(data);
    return this.repo.save(song);
  }

  async findAll() {
    const songs = await this.repo.find();
    return songs;
  }

  async findById(id: number) {
    const song = await this.repo.findOne({
      id,
    });
    if (!song) throw new NotFoundException("this song doens't exists");

    return song;
  }

  async updateById(id: number, data: UpdateSongDto) {
    // check if album exists
    if (data.singerAlbumId)
      await this.singerAlbumsService.findById(data.singerAlbumId);

    // thorw error if not exists
    const song = await this.findById(id);
    await this.checkUniqeness(
      data.name || song.name,
      data.source || song.source,
    );

    if (data.image) {
      if (song.image) {
        await this.awsService.deleteFile(song.image);
      }
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.SINGER_IMAGES,
      );
      data.image = imagePath;
    }

    Object.assign(song, data);
    return this.repo.save(song);
  }

  async deleteById(id: number) {
    // thorw error if not exists
    const song = await this.findById(id);

    const deletedSong = await this.repo.remove(song);
    if (deletedSong.image) {
      await this.awsService.deleteFile(deletedSong.image);
    }
    return this.repo.save(deletedSong);
  }

  private async checkUniqeness(name: string, source: string) {
    const song = await this.repo.findOne({ name, source });
    if (song)
      throw new BadRequestException(
        'there are a song that have the same source and name',
      );
  }
}
