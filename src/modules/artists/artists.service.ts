import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AwsService } from 'src/common/modules/aws/aws.service';
import { AwsFolderEnum } from 'src/common/enums/aws-folder.enum';
import { ArtistEnum } from 'src/common/enums/artist-type.enum';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private readonly repo: Repository<Artist>,
    private readonly awsService: AwsService,
  ) {}

  async create(data: CreateArtistDto) {
    // check if the name is unique
    await this.checkUniqueness(data.name, data.type);

    // upload image
    if (data.image) {
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.ARTIST_IMAGES,
      );
      data.image = imagePath;
    }

    const artist = this.repo.create(data);
    return await this.repo.save(artist);
  }

  async findAll(type?: ArtistEnum) {
    let artists: Artist[];
    if (!type) {
      artists = await this.repo.find();
    } else {
      if (Object.values(ArtistEnum).includes(type))
        artists = await this.repo.find({ type });
      else
        throw new NotFoundException(
          "Type is'nt of type Artist (Singer | Musician)",
        );
    }

    return artists;
  }

  async findById(id: number) {
    // if(!id) return new NotFoundException("This songer doesn't existes");
    const artist = await this.repo.findOne({
      id: id,
    });

    if (!artist) throw new NotFoundException("This songer doesn't existes");
    return artist;
  }

  async updateById(id: number, data: UpdateArtistDto) {
    const artist = await this.findById(id);
    await this.checkUniqueness(
      data.name || artist.name,
      data.type || artist.type,
    );

    if (data.image) {
      if (artist.image) {
        await this.awsService.deleteFile(artist.image);
      }
      const imagePath = await this.awsService.uploadFile(
        data.image,
        AwsFolderEnum.ARTIST_IMAGES,
      );
      data.image = imagePath;
    }

    Object.assign(artist, data);
    return await this.repo.save(artist);
  }

  async deleteById(id: number) {
    const artist = await this.findById(id);

    const deletedArtist = await this.repo.remove(artist);

    await this.repo.save(deletedArtist);
    if (deletedArtist.image) {
      await this.awsService.deleteFile(deletedArtist.image);
    }
    return deletedArtist;
  }

  private async checkUniqueness(name: string, type: ArtistEnum) {
    const entity = await this.repo.findOne({ name, type });
    if (entity) throw new BadRequestException('this name is already exists');
  }
}
