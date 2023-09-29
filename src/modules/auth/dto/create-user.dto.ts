import { IntersectionType } from '@nestjs/mapped-types';
import { AuthDto } from './auth.dto';
import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto extends IntersectionType(
  AuthDto,
  CreateProfileDto,
) {}
