import { Artist } from 'src/modules/artists/entities/artist.entity';
import { Tune } from 'src/modules/tunes/entities/tune.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumTypeEnum } from '../enum/album-type.enum';
@Entity()
export class ArtistAlbum extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;

  @Column({
    type: 'enum',
    enum: AlbumTypeEnum,
  })
  type: AlbumTypeEnum;

  //   foregn key
  @Column()
  artistId: number;

  @OneToMany(() => Tune, (tune) => tune.album, {
    eager: true,
  })
  tunes: Tune[];
}
