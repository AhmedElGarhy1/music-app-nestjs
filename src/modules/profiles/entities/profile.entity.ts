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
import { User } from 'src/modules/auth/entities/user.entity';
import { GenderEnum } from 'src/common/enums/gender.enum';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';

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

  @Column({
    nullable: true,
  })
  image: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
