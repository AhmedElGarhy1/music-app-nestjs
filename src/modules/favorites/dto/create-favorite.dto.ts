import { IsNumber, IsOptional } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  tuneId: number;
}
