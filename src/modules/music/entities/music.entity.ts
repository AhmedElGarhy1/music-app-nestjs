import { AbstractMusic } from 'src/common/classes/abstract-music';
import { MusicTypeEnum } from 'src/common/enums/music-type.enum';
import { LanguageEnum } from 'src/common/enums/language.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { MusicianAlbum } from '../../musician-albums/entities/musician-album.entity';
import { Track } from '../../tracks/track.entity';

@Entity()
export class Music extends AbstractMusic {
  @Column({
    type: 'enum',
    enum: MusicTypeEnum,
  })
  type: MusicTypeEnum;

  @Column({
    type: 'enum',
    enum: LanguageEnum,
  })
  language: LanguageEnum;

  @ManyToOne((type) => MusicianAlbum, (album) => album.musics)
  @JoinColumn({ name: 'musicianAlbumId' })
  album: MusicianAlbum;

  //   foregn key
  @Column()
  musicianAlbumId: number;

  @OneToMany(() => Track, (track) => track.music, {
    eager: true,
  })
  tracks: Track[];
}
