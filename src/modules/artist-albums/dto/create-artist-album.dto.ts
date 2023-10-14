import { IsNumberString, IsString } from 'class-validator';
import { CreateAlbumDto } from 'src/common/dto/album/create-album.dto';
import { AlbumTypeEnum } from '../enum/album-type.enum';
import { IsEnumValidator } from 'src/common/decorators/validation/is-enum-validator.decorator';

export class CreateArtistAlbumDto extends CreateAlbumDto {
  @IsString()
  name: string;

  image: any;

  @IsNumberString()
  artistId: number;

  @IsEnumValidator(AlbumTypeEnum)
  type: AlbumTypeEnum;
}
