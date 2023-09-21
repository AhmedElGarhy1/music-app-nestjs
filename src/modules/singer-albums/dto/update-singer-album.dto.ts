import { CreateSingerAlbumDto } from './create-singer-album.dto';

import { PartialType } from '@nestjs/swagger';
export class UpdateSingerAlbumDto extends PartialType(CreateSingerAlbumDto) {}
