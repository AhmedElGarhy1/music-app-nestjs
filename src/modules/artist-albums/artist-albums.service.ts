import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistAlbum } from './entities/artist-album.entity';
import { Repository } from 'typeorm';
import { CreateArtistAlbumDto } from './dto/create-artist-album.dto';
import { UpdateArtistAlbumDto } from './dto/update-artist-album.dto';
import { AwsFolderEnum } from 'src/common/enums/aws-folder.enum';
import { AwsService } from 'src/common/modules/aws/aws.service';
import { ArtistsService } from '../artists/artists.service';
import { ArtistEnum } from 'src/common/enums/artist-type.enum';
import { AlbumTypeEnum } from './enum/album-type.enum';
import { valueInEnum } from 'src/common/utils/valueInEnum.util';

@Injectable()
export class ArtistAlbumsService {
  constructor(
    @InjectRepository(ArtistAlbum)
    private readonly repo: Repository<ArtistAlbum>,
    private readonly artistsService: ArtistsService,
    private readonly awsService: AwsService,
  ) {}

  async create(data: CreateArtistAlbumDto) {
    // check if artist exists
    const artist = await this.artistsService.findById(data.artistId);
    // check uniqueness
    await this.checkUniqueness(data.name, data.artistId);
    if (artist.type === ArtistEnum.SINGER) {
      if (data.type !== AlbumTypeEnum.SINGER_ALBUM) {
        throw new BadRequestException('Singer must have a singerAlbum');
      }
    }
    if (artist.type === ArtistEnum.MUSICIAN) {
      if (data.type !== AlbumTypeEnum.MUSICIAN_ALBUM) {
        throw new BadRequestException('Musician must have a musicianAlbum');
      }
    }

    // upload image
    if (data.image) {
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.ARTIST_ALBUM_IMAGES,
      );
      data.image = imagePath;
    } else {
      data.image = artist.image;
    }

    const artistAlbum = this.repo.create(data);
    return await this.repo.save(artistAlbum);
  }

  async findAll(type?: AlbumTypeEnum) {
    let artistAlbums: ArtistAlbum[];
    if (type) {
      if (valueInEnum(type, AlbumTypeEnum))
        artistAlbums = await this.repo.find({ type });
      else
        throw new NotFoundException(
          "Type isn't of type AlbumType (SingerAlbum | MusicianAlbum)",
        );
    } else {
      artistAlbums = await this.repo.find();
    }

    return artistAlbums;
  }

  async findById(id: number) {
    const artistAlbum = await this.repo.findOne({
      id: id,
    });
    if (!artistAlbum)
      throw new NotFoundException("This artistAlbum doesn't existes");

    return artistAlbum;
  }

  async updateById(id: number, data: UpdateArtistAlbumDto) {
    // check if artist exists
    if (data.artistId) await this.artistsService.findById(data.artistId);
    const artistAlbum = await this.findById(id);
    await this.checkUniqueness(
      data.name,
      data.artistId || artistAlbum.artistId,
    );

    if (data.image) {
      if (artistAlbum.image) {
        await this.awsService.deleteFile(artistAlbum.image);
      }
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.SINGER_IMAGES,
      );
      data.image = imagePath;
    }

    // TODO you can't change the type

    Object.assign(artistAlbum, data);
    return await this.repo.save(artistAlbum);
  }

  async deleteById(id: number) {
    const artistAlbum = await this.findById(id);

    const deletedArtistAlbum = await this.repo.remove(artistAlbum);
    await this.repo.save(deletedArtistAlbum);
    if (deletedArtistAlbum.image) {
      await this.awsService.deleteFile(deletedArtistAlbum.image);
    }
    return deletedArtistAlbum;
  }

  // helpers
  private async checkUniqueness(name: string, artistId: number) {
    const artistAlbum = await this.repo.findOne({ artistId, name });

    if (artistAlbum && name === artistAlbum.name)
      throw new BadRequestException(
        `artist can't have more than one album with the same name`,
      );
  }
}
