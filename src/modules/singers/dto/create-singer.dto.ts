import { ArtistEnum } from 'src/common/enums/artist-type.enum';
import { GenderEnum } from 'src/common/enums/gender.enum';

import { IsString, IsEnum, Matches, IsNotEmpty } from 'class-validator';
import { IsEnumValidation } from 'src/common/decorators/IsEnumValidation';
import { IsFileValidation } from 'src/common/decorators/IsFileValidation';

export class CreateSingerDto {
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
