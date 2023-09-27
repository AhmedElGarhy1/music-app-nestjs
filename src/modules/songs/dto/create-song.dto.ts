import { IsNumberString } from 'class-validator';
import { IsEnumValidation } from 'src/common/decorators/IsEnumValidation';
import { CreateTuneDto } from 'src/common/dto/tune/create-tune.dto';
import { SongTypeEnum } from 'src/common/enums/song-type.enum';

export class CreateSongDto extends CreateTuneDto {
  @IsEnumValidation(SongTypeEnum)
  type: SongTypeEnum;

  @IsNumberString()
  singerAlbumId: number;
}
