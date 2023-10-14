import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Track } from '../../tracks/entities/track.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
@Unique(['name', 'userId'])
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
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
