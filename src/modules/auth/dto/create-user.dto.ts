import { RoleEnum } from 'src/common/enums/role.enum';
import { Auth } from 'src/common/classes/auth';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import { IsEmail, IsString } from 'class-validator';
import { Favorite } from 'src/modules/favorites/entities/favorite.entity';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  salt: string;

  roles: RoleEnum[];

  auth: Auth;

  profile: Profile;

  profileId: number;

  favorite: Favorite;

  favoriteId: number;
}
