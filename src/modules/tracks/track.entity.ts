import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Playlist } from '../playlists/playlist.entity';
import { Favorite } from '../favorites/favorite.entity';
import { Song } from '../songs/song.entity';
import { Music } from '../music/music.entity';

@Entity()
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated()
  index: number;

  @Column()
  title: string;

  @Column()
  link: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.tracks)
  playlist: Playlist;
  //   foregn key
  @Column({
    nullable: true,
  })
  playlistId: number;

  @ManyToOne(() => Favorite, (favorite) => favorite.tracks)
  favorite: Favorite;
  //   foregn key
  @Column({
    nullable: true,
  })
  favoriteId: number;

  @ManyToOne(() => Song, (favorite) => favorite.tracks)
  song: Song;
  //   foregn key
  @Column({
    nullable: true,
  })
  songId: number;

  @ManyToOne(() => Music, (music) => music.tracks)
  music: Music;
  //   foregn key
  @Column({
    nullable: true,
  })
  musicId: number;
}
