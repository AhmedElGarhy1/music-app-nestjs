import { IsString } from 'class-validator';
import { IsEnumValidator } from 'src/common/decorators/validation/is-enum-validator.decorator';
import { ArtistGroupEnum } from 'src/common/enums/artist-group.enum';
import { ArtistEnum } from 'src/common/enums/artist-type.enum';
import { GenderEnum } from 'src/common/enums/gender.enum';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsString()
  info: string;

  image: any;

  @IsString()
  nationality: string;

  @IsEnumValidator(ArtistEnum)
  type: ArtistEnum;

  @IsEnumValidator(ArtistGroupEnum)
  artistGroupType: ArtistGroupEnum;

  @IsEnumValidator(GenderEnum)
  gender: GenderEnum;
}
