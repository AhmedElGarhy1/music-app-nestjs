import { ArtistGroupEnum } from 'src/common/enums/artist-group.enum';
import { ArtistEnum } from 'src/common/enums/artist-type.enum';
import { GenderEnum } from 'src/common/enums/gender.enum';
import { ArtistAlbum } from 'src/modules/artist-albums/entities/artist-album.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  info: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
  })
  gender: GenderEnum;

  @Column({
    type: 'enum',
    enum: ArtistGroupEnum,
  })
  artistGroupType: ArtistGroupEnum;

  @Column({
    type: 'enum',
    enum: ArtistEnum,
  })
  type: ArtistEnum;

  @Column()
  nationality: string;

  // relations
  @OneToMany(() => ArtistAlbum, (album) => album.artist, {
    eager: true,
  })
  albums: ArtistAlbum[];
}
