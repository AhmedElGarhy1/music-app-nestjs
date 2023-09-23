import { IsISO8601, IsNumber, IsString } from 'class-validator';
import { IsEnumValidation } from 'src/common/decorators/IsEnumValidation';
import { LanguageEnum } from 'src/common/enums/language.enum';

export class CreateTuneDto {
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

  @IsEnumValidation(LanguageEnum)
  language: LanguageEnum;
}
