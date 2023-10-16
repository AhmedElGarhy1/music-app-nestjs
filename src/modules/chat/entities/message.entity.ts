import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  roomName: string;

  @Column()
  sender: string;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;

  @Column()
  roomId: number;

  @ManyToOne(() => User, (user) => user.messages)
  user: Room;

  @Column()
  userId: number;
}
