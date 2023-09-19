import {
  IsDate,
  IsDateString,
  IsISO8601,
  IsNumber,
  IsString,
  isNumber,
} from 'class-validator';
import { IsEnumValidation } from 'src/common/decorators/IsEnumValidation';
import { LanguageEnum } from 'src/common/enums/language.enum';
import { SongTypeEnum } from 'src/common/enums/song-type.enum';

export class CreateSongDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  artist: string;

  @IsNumber()
  rate: number;

  @IsString()
  source: string;

  @IsISO8601({ strict: true })
  publishedIn: string;

  @IsString()
  tempImage: string;

  @IsEnumValidation(SongTypeEnum)
  type: SongTypeEnum;

  @IsEnumValidation(LanguageEnum)
  language: LanguageEnum;

  @IsNumber()
  singerAlbumId: number;
}
