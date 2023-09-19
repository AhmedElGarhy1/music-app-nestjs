import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Track } from '../../tracks/track.entity';

@Entity('favorite-list')
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Profile, (profile) => profile.favorite)
  profile: Profile;

  @OneToMany(() => Track, (track) => track.favorite, {
    eager: true,
  })
  tracks: Track[];
}
