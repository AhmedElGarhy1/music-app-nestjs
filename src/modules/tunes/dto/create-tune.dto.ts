import {
  IsISO8601,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { IsEnumValidator } from 'src/common/decorators/validation/is-enum-validator.decorator';
import { LanguageEnum } from 'src/common/enums/language.enum';
import { MusicTypeEnum } from 'src/common/enums/music-type.enum';
import { SongTypeEnum } from 'src/common/enums/song-type.enum';
import { TuneTypeEnum } from 'src/common/enums/tune-type.enum';

export class CreateTuneDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  artist: string;

  @IsNumberString()
  rate: number;

  @IsString({
    groups: [],
  })
  source: string;

  @IsISO8601({ strict: true })
  publishedIn: string;

  image: any;

  @IsEnumValidator(LanguageEnum)
  language: LanguageEnum;

  @IsEnumValidator(TuneTypeEnum)
  type: TuneTypeEnum;

  @ValidateIf((object) => object.type === TuneTypeEnum.SONG)
  @IsEnumValidator(SongTypeEnum)
  songType: SongTypeEnum;

  @ValidateIf((object) => object.type === TuneTypeEnum.MUSIC)
  @IsEnumValidator(MusicTypeEnum)
  musicType: MusicTypeEnum;

  @IsNumberString()
  singerAlbumId: number;
}
