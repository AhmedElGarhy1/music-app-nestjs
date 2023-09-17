import { AbstractAlbum } from 'src/common/classes/abstract-album';
import { Entity, ManyToOne } from 'typeorm';
import { Musician } from '../musician/musician.entity';

@Entity()
export class MusicianAlbum extends AbstractAlbum {
  @ManyToOne(() => Musician, (musician) => musician.musicianAlbums)
  musician: Musician;
}
