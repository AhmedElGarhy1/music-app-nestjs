import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsEnumValidation } from 'src/common/decorators/IsEnumValidation';
import { LanguageEnum } from 'src/common/enums/language.enum';
import { SongTypeEnum } from 'src/common/enums/song-type.enum';

export class UpdateSongDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  artist: string;

  @IsOptional()
  @IsNumber()
  rate: number;

  @IsOptional()
  @IsString()
  source: string;

  @IsOptional()
  @IsDate()
  publishedIn: Date;

  @IsOptional()
  @IsString()
  tempImage: string;

  @IsOptional()
  @IsEnumValidation(SongTypeEnum)
  type: SongTypeEnum;

  @IsOptional()
  @IsEnumValidation(LanguageEnum)
  language: LanguageEnum;

  @IsOptional()
  @IsNumber()
  singerAlbumId: number;
}
