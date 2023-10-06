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
import { Profile } from '../../profiles/entities/profile.entity';
import { Track } from '../../tracks/track.entity';
import { User } from 'src/modules/auth/entities/user.entity';

@Entity()
@Unique(['name'])
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;

  // foregn key
  @Column()
  userId: number;

  @OneToMany(() => Track, (track) => track.playlist, {
    eager: true,
  })
  tracks: Track[];
}
