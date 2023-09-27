import { CreateSingerAlbumDto } from './create-singer-album.dto';

import { PartialType } from '@nestjs/mapped-types';
export class UpdateSingerAlbumDto extends PartialType(CreateSingerAlbumDto) {}
