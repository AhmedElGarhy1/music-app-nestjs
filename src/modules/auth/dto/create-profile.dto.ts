import { IsNumber, IsPhoneNumber, IsString, Max, Min } from 'class-validator';
import { IsEnumValidation } from 'src/common/decorators/IsEnumValidation';
import { GenderEnum } from 'src/common/enums/gender.enum';

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  @Min(14)
  age: number;

  @IsPhoneNumber('eg')
  phone: string;

  @IsEnumValidation(GenderEnum)
  gender: GenderEnum;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  address: string;
}
