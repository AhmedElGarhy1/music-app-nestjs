import { IsString } from 'class-validator';
import { IsEnumValidation } from 'src/common/decorators/IsEnumValidation';
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

  @IsEnumValidation(ArtistEnum)
  type: ArtistEnum;

  @IsEnumValidation(GenderEnum)
  gender: GenderEnum;
}
