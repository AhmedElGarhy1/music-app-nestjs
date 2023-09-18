import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/modules/auth/user.entity';
import { GenderEnum } from 'src/common/enums/gender.enum';
import { Favorite } from '../favorites/favorite.entity';
import { Playlist } from '../playlists/playlist.entity';

@Entity()
@Unique(['phone'])
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    array: false,
  })
  gender: GenderEnum;

  @Column()
  age: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToOne(() => Favorite, (favorite) => favorite.profile)
  @JoinColumn()
  favorite: Favorite;

  @OneToMany(() => Playlist, (playlist) => playlist.profile, {
    eager: true,
  })
  playlists: Playlist[];
}
