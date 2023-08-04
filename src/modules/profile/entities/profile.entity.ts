import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Gender } from '../enums/gender.enum';
import { User } from 'src/modules/auth/entities/user.entity';

@Entity('profiles')
@Unique(['phone'])
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: Gender;

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
}
