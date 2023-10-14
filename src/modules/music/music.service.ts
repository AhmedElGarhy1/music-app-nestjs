import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { IMusicService } from './interfaces/IMusicService';
import { MusicianAlbumsService } from '../musician-albums/musician-albums.service';
import { AwsService } from 'src/common/modules/aws/aws.service';
import { AwsFolderEnum } from 'src/common/enums/aws-folder.enum';

@Injectable()
export class MusicService implements IMusicService {
  constructor(
    @InjectRepository(Music) private repo: Repository<Music>,
    private musicianAlbumService: MusicianAlbumsService,
    private readonly awsService: AwsService,
  ) {}

  async create(data: CreateMusicDto) {
    // check if album exists
    const musicianAlbum = await this.musicianAlbumService.findById(
      data.musicianAlbumId,
    );

    await this.checkUniqueness(data.name, data.source);

    // upload image
    if (data.image) {
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.MUSIC_IMAGES,
      );
      data.image = imagePath;
    } else {
      data.image = musicianAlbum.image;
    }

    const music = this.repo.create(data);
    return this.repo.save(music);
  }

  async findAll() {
    const music = await this.repo.find();
    return music;
  }

  async findById(id: number) {
    const music = await this.repo.findOne({
      id,
    });
    if (!music) throw new NotFoundException("this music doens't exists");

    return music;
  }

  async updateById(id: number, data: UpdateMusicDto) {
    // check if album exists
    if (data.musicianAlbumId)
      await this.musicianAlbumService.findById(data.musicianAlbumId);

    // thorw error if not exists
    const music = await this.findById(id);
    await this.checkUniqueness(
      data.name || music.name,
      data.source || music.source,
    );

    if (data.image) {
      if (music.image) {
        await this.awsService.deleteFile(music.image);
      }
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.SONG_IMAGES,
      );
      data.image = imagePath;
    }

    Object.assign(music, data);
    return this.repo.save(music);
  }

  async deleteById(id: number) {
    // thorw error if not exists
    const music = await this.findById(id);

    const deletedMusic = await this.repo.remove(music);
    await this.repo.save(deletedMusic);
    if (deletedMusic.image) {
      await this.awsService.deleteFile(deletedMusic.image);
    }
  }

  private async checkUniqueness(name: string, source: string) {
    const music = await this.repo.findOne({ name, source });
    if (music)
      throw new BadRequestException(
        'there are a music that have the same source and name',
      );
  }
}
