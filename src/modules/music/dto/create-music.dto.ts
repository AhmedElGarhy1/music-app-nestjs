import { IsNumberString } from 'class-validator';
import { IsEnumValidation } from 'src/common/decorators/IsEnumValidation';
import { CreateTuneDto } from 'src/common/dto/tune/create-tune.dto';
import { MusicTypeEnum } from 'src/common/enums/music-type.enum';

export class CreateMusicDto extends CreateTuneDto {
  @IsEnumValidation(MusicTypeEnum)
  type: MusicTypeEnum;

  @IsNumberString()
  musicianAlbumId: number;
}
