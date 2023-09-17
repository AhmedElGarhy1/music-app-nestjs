import { AbstractArtist } from 'src/common/classes/abstract-artist';
import { Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { MusicianAlbum } from '../musician-album/musician-album.entity';

@Entity('musicians')
@Unique(['name'])
export class Musician extends AbstractArtist {
  @OneToMany(() => MusicianAlbum, (musicianAlbum) => musicianAlbum.musician, {
    eager: true,
  })
  musicianAlbums: MusicianAlbum[];
}
