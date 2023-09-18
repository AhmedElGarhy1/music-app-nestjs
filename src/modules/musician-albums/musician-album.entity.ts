import { AbstractAlbum } from 'src/common/classes/abstract-album';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Musician } from '../musicians/musician.entity';
import { Music } from '../music/music.entity';

@Entity('musician-album')
export class MusicianAlbum extends AbstractAlbum {
  @ManyToOne(() => Musician, (musician) => musician.albums)
  musician: Musician;

  //   foregn key
  @Column()
  musicianId: number;

  @OneToMany(() => Music, (music) => music.album)
  musics: Music[];
}
