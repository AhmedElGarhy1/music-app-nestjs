import { ArtistEnum } from 'src/common/enums/artist-type.enum';
import { GenderEnum } from 'src/common/enums/gender.enum';

import { IsString, IsEnum, Matches, IsOptional } from 'class-validator';
import { IsEnumValidation } from 'src/common/decorators/IsEnumValidation';

export class UpdateSingerDto {
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
  @IsEnumValidation(ArtistEnum)
  type: ArtistEnum;

  @IsOptional()
  @IsEnumValidation(GenderEnum)
  gender: GenderEnum;
}
