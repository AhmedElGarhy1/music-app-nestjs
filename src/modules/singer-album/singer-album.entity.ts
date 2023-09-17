import { AbstractAlbum } from 'src/common/classes/abstract-album';
import { Entity, ManyToOne } from 'typeorm';
import { Singer } from '../singer/singer.entity';

@Entity()
export class SingerAlbum extends AbstractAlbum {
  @ManyToOne(() => Singer, (singer) => singer.singerAlbums)
  singer: Singer;
}
