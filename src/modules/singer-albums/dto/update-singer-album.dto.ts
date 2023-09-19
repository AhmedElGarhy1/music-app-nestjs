import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateSingerAlbumDto {
  @IsOptional()
  @IsString()
  @Column()
  name: string;

  @IsOptional()
  @IsString()
  @Column()
  image: string;

  @IsOptional()
  @IsNumber()
  @Column()
  singerId: number;
}
