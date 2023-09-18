import { ArtistEnum } from 'src/common/enums/artist-type.enum';
import { GenderEnum } from 'src/common/enums/gender.enum';

import { IsString, IsEnum, Matches } from 'class-validator';
import { isEnumValidation } from 'src/common/decorators/IsEnumValidation';

export class CreateSongDto {
  @IsString()
  name: string;

  @IsString()
  info: string;

  @IsString()
  image: string;

  @IsString()
  nationality: string;

  @isEnumValidation(ArtistEnum)
  type: ArtistEnum;

  @isEnumValidation(GenderEnum)
  gender: GenderEnum;
}
