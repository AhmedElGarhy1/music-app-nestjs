import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../profiles/profile.entity';
import { Track } from '../tracks/track.entity';

@Entity()
@Unique(['name'])
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Profile, (profile) => profile.playlists)
  profile: Profile;

  // foregn key
  @Column()
  profileId: number;

  @OneToMany(() => Track, (track) => track.playlist, {
    eager: true,
  })
  tracks: Track[];
}
