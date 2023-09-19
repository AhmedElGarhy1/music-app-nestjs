import { AbstractArtist } from 'src/common/classes/abstract-artist';
import { Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { MusicianAlbum } from '../../musician-albums/entities/musician-album.entity';

@Entity('musicians')
@Unique(['name'])
export class Musician extends AbstractArtist {
  @OneToMany(() => MusicianAlbum, (album) => album.musician, {
    eager: true,
  })
  albums: MusicianAlbum[];
}
