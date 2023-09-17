import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/modules/auth/user.entity';
import { GenderEnum } from 'src/common/enums/gender.enum';

@Entity('profiles')
@Unique(['phone'])
export class Profile {
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

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
