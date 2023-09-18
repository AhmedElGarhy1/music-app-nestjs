import { AbstractArtist } from 'src/common/classes/abstract-artist';
import { Entity, OneToMany, Unique } from 'typeorm';
import { SingerAlbum } from '../../singer-album/singer-album.entity';

@Entity()
@Unique(['name'])
export class Singer extends AbstractArtist {
  @OneToMany(() => SingerAlbum, (album) => album.singer, {
    eager: true,
  })
  albums: SingerAlbum[];
}
