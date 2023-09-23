import { PartialType } from '@nestjs/swagger';
import { CreateMusicianAlbumDto } from './create-musician-album.dto';

export class UpdateMusicianAlbumDto extends PartialType(
  CreateMusicianAlbumDto,
) {}
