import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RoleEnum } from '../../../common/enums/role.enum';
import { Auth } from '../../../common/classes/auth';
import { Profile } from '../../profiles/entities/profile.entity';
import { Favorite } from 'src/modules/favorites/entities/favorite.entity';
import { Playlist } from 'src/modules/playlists/entities/playlist.entity';

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
  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
  })
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => Favorite, (favorite) => favorite.user)
  @JoinColumn()
  favorite: Favorite;

  @OneToMany(() => Playlist, (playlist) => playlist.user, {
    eager: true,
  })
  playlists: Playlist[];

  // forign keys
  @Column()
  profileId: number;

  @Column()
  favoriteId: number;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  haveRoles(roles: RoleEnum[]) {
    return this.roles.some((userRole: string) => {
      return roles.some((role) => userRole === role);
    });
  }
}
