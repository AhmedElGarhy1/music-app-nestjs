import { AbstractTune } from 'src/common/classes/abstract-tune';
import { MusicTypeEnum } from 'src/common/enums/music-type.enum';
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
export class Music extends AbstractTune {
  @Column({
    type: 'enum',
    enum: MusicTypeEnum,
  })
  type: MusicTypeEnum;

  @ManyToOne((type) => MusicianAlbum, (album) => album.music)
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
