import { ArtistEnum } from 'src/common/enums/artist-type.enum';
import { GenderEnum } from 'src/common/enums/gender.enum';

import { IsString, IsEnum, Matches, IsOptional } from 'class-validator';
import { isEnumValidation } from 'src/common/decorators/IsEnumValidation';

export class UpdateSongDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  info: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  nationality: string;

  @IsOptional()
  @isEnumValidation(ArtistEnum)
  type: ArtistEnum;

  @IsOptional()
  @isEnumValidation(GenderEnum)
  gender: GenderEnum;
}
