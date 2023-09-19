import { AbstractAlbum } from 'src/common/classes/abstract-album';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Singer } from '../../singers/entities/singer.entity';
import { Song } from '../../songs/entities/song.entity';

@Entity('singer_album')
@Unique(['singerId', 'name'])
export class SingerAlbum extends AbstractAlbum {
  @ManyToOne(() => Singer, (singer) => singer.albums)
  singer: Singer;

  @Column()
  singerId: number;

  @OneToMany(() => Song, (song) => song.album, {
    eager: true,
  })
  songs: Song[];
}
