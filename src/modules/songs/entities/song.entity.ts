import { AbstractMusic } from 'src/common/classes/abstract-music';
import { LanguageEnum } from 'src/common/enums/language.enum';
import { SongTypeEnum } from 'src/common/enums/song-type.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { SingerAlbum } from '../../singer-albums/entities/singer-album.entity';
import { Track } from '../../tracks/track.entity';

@Entity()
export class Song extends AbstractMusic {
  @Column({
    type: 'enum',
    enum: SongTypeEnum,
  })
  type: SongTypeEnum;

  @Column({
    type: 'enum',
    enum: LanguageEnum,
  })
  language: LanguageEnum;

  @ManyToOne(() => SingerAlbum, (album) => album.songs)
  @JoinColumn({ name: 'singerAlbumId' })
  album: SingerAlbum;

  // foregn key
  @Column()
  singerAlbumId: number;

  @OneToMany(() => Track, (track) => track.song, {
    eager: true,
  })
  tracks: Track[];
}
