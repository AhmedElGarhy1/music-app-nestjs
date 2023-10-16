import { IsNumberString, IsString } from 'class-validator';
import { AlbumTypeEnum } from '../enum/album-type.enum';
import { IsEnumValidator } from 'src/common/decorators/validation/is-enum-validator.decorator';

export class CreateArtistAlbumDto {
  @IsString()
  name: string;

  image: any;

  @IsNumberString()
  artistId: number;

  @IsEnumValidator(AlbumTypeEnum)
  type: AlbumTypeEnum;
}
