import { CreateArtistAlbumDto } from './create-artist-album.dto';

import { PartialType } from '@nestjs/mapped-types';
export class UpdateArtistAlbumDto extends PartialType(CreateArtistAlbumDto) {}
