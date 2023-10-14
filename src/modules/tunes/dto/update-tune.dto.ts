import { PartialType } from '@nestjs/mapped-types';
import { CreateTuneDto } from './create-tune.dto';

export class UpdateTuneDto extends PartialType(CreateTuneDto) {}
