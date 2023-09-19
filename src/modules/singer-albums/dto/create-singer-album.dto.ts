import { IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateSingerAlbumDto {
  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  image: string;

  @IsNumber()
  @Column()
  singerId: number;
}
