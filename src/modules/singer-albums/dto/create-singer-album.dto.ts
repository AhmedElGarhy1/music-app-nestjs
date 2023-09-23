import { IsNumber } from 'class-validator';
import { CreateAlbumDto } from 'src/common/dto/album/create-album.dto';

export class CreateSingerAlbumDto extends CreateAlbumDto {
  @IsNumber()
  singerId: number;
}
