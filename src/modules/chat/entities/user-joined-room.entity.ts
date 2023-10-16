import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { Room } from './room.entity';

@Entity()
export class UserJoinedRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdBy: string;

  @Column()
  joinedUsername: string;

  @ManyToOne(() => Room, (room) => room.userJoinedRooms)
  room: Room;
}
