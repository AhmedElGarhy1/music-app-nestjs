import { IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  image: any;
}
