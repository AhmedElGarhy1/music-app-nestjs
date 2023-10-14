import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Tune } from 'src/modules/tunes/entities/tune.entity';

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

  @ManyToOne(() => Favorite, (favorite) => favorite.tracks)
  favorite: Favorite;

  @ManyToOne(() => Tune, (tune) => tune.tracks)
  tune: Tune;

  //   foregn keys
  @Column({
    nullable: true,
  })
  playlistId: number;

  @Column({
    nullable: true,
  })
  favoriteId: number;

  @Column({
    nullable: true,
  })
  tuneId: number;
}
