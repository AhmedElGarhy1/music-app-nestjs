import { IsNumberString } from 'class-validator';
import { IsEnumValidator } from 'src/common/decorators/validation/is-enum-validator.decorator';
import { CreateTuneDto } from 'src/common/dto/tune/create-tune.dto';
import { SongTypeEnum } from 'src/common/enums/song-type.enum';

export class CreateSongDto extends CreateTuneDto {
  @IsEnumValidator(SongTypeEnum)
  type: SongTypeEnum;

  @IsNumberString()
  singerAlbumId: number;
}
