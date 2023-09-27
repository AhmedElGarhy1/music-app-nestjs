import { IsNumberString } from 'class-validator';
import { CreateAlbumDto } from 'src/common/dto/album/create-album.dto';

export class CreateSingerAlbumDto extends CreateAlbumDto {
  @IsNumberString()
  singerId: number;
}
