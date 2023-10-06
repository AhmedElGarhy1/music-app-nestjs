import { IsNumberString } from 'class-validator';
import { IsEnumValidator } from 'src/common/decorators/validation/is-enum-validator.decorator';
import { CreateTuneDto } from 'src/common/dto/tune/create-tune.dto';
import { MusicTypeEnum } from 'src/common/enums/music-type.enum';

export class CreateMusicDto extends CreateTuneDto {
  @IsEnumValidator(MusicTypeEnum)
  type: MusicTypeEnum;

  @IsNumberString()
  musicianAlbumId: number;
}
