import { IsNumberString } from 'class-validator';
import { CreateAlbumDto } from 'src/common/dto/album/create-album.dto';

export class CreateMusicianAlbumDto extends CreateAlbumDto {
  @IsNumberString()
  musicianId: number;
}
