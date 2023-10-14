import { IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNumber()
  tuneId: number;
}
