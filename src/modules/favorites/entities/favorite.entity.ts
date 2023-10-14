import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Track } from '../../tracks/track.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('favorite-list')
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.favorite)
  user: User;

  @OneToMany(() => Track, (track) => track.favorite, {
    eager: true,
  })
  tracks: Track[];
}
