import { IsISO8601, IsNumberString, IsString } from 'class-validator';
import { IsEnumValidator } from 'src/common/decorators/validation/is-enum-validator.decorator';
import { LanguageEnum } from 'src/common/enums/language.enum';

export class CreateTuneDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  artist: string;

  @IsNumberString()
  rate: number;

  @IsString()
  source: string;

  @IsISO8601({ strict: true })
  publishedIn: string;

  image: any;

  @IsEnumValidator(LanguageEnum)
  language: LanguageEnum;
}
