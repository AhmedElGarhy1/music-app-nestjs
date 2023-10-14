import { IsNumber, IsOptional } from 'class-validator';

export class CreateFavoriteDto {
  @IsOptional()
  @IsNumber()
  songId: number;

  @IsOptional()
  @IsNumber()
  musicId: number;
}
