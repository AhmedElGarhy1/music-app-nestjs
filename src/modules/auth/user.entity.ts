import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RoleEnum } from '../../common/enums/role.enum';
import { Auth } from '../../common/classes/auth';
import { Profile } from '../profiles/profile.entity';

@Entity('users')
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  salt: string;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    array: true,
  })
  roles: RoleEnum[];

  @Column('simple-json')
  auth: Auth;

  // relations
  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  // forign keys
  @Column()
  profileId: number;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
