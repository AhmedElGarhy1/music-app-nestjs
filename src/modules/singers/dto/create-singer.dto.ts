import { ArtistEnum } from 'src/common/enums/artist-type.enum';
import { GenderEnum } from 'src/common/enums/gender.enum';

import { IsString, IsEnum, Matches } from 'class-validator';
import { IsEnumValidation } from 'src/common/decorators/IsEnumValidation';

export class CreateSingerDto {
  @IsString()
  name: string;

  @IsString()
  info: string;

  @IsString()
  image: string;

  @IsString()
  nationality: string;

  @IsEnumValidation(ArtistEnum)
  type: ArtistEnum;

  @IsEnumValidation(GenderEnum)
  gender: GenderEnum;
}
