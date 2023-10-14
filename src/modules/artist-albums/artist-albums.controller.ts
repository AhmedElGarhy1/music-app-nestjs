import { Controller } from '@nestjs/common';
import { ArtistAlbumsService } from './artist-albums.service';

@Controller('artist-albums')
export class ArtistAlbumsController {
  constructor(private readonly artistAlbumsService: ArtistAlbumsService) {}
}
