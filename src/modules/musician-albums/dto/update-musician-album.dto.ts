import { PartialType } from '@nestjs/mapped-types';
import { CreateMusicianAlbumDto } from './create-musician-album.dto';

export class UpdateMusicianAlbumDto extends PartialType(
  CreateMusicianAlbumDto,
) {}
