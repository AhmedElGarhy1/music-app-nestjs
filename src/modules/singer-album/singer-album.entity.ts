import { AbstractAlbum } from 'src/common/classes/abstract-album';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Singer } from '../singer/singer.entity';

@Entity()
export class SingerAlbum extends AbstractAlbum {
  @ManyToOne(() => Singer, (singer) => singer.singerAlbums)
  singer: Singer;

  @Column()
  singer_id: number;
}
