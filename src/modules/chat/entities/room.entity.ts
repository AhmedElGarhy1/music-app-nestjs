import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { UserJoinedRoom } from './user-joined-room.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  createdBy: string;

  @OneToMany(() => Message, (message) => message.room, {
    eager: true,
  })
  messages: Message[];

  @OneToMany(() => UserJoinedRoom, (userJoinedRoom) => userJoinedRoom.room, {
    eager: true,
  })
  userJoinedRooms: UserJoinedRoom[];
}
