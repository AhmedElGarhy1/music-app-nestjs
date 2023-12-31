import { LanguageEnum } from 'src/common/enums/language.enum';
import { MusicTypeEnum } from 'src/common/enums/music-type.enum';
import { SongTypeEnum } from 'src/common/enums/song-type.enum';
import { TuneTypeEnum } from 'src/common/enums/tune-type.enum';
import { ArtistAlbum } from 'src/modules/artist-albums/entities/artist-album.entity';
import { Track } from 'src/modules/tracks/entities/track.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name', 'source'])
export class Tune extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  artist: string;

  @Column()
  rate: number;

  @Column()
  source: string;

  @Column({ type: 'date' })
  publishedIn: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: LanguageEnum,
  })
  language: LanguageEnum;

  @Column({
    type: 'enum',
    enum: TuneTypeEnum,
  })
  type: TuneTypeEnum;

  @Column()
  tuneType: SongTypeEnum | MusicTypeEnum;

  @ManyToOne(() => ArtistAlbum, (album) => album.tunes)
  @JoinColumn()
  album: ArtistAlbum;

  // foregn key
  @Column()
  artistAlbumId: number;

  @OneToMany(() => Track, (track) => track.tune, {
    eager: true,
  })
  tracks: Track[];
}
