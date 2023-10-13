import { IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsOptional()
  @IsNumber()
  musicId: number;

  @IsOptional()
  @IsNumber()
  songId: number;
}
