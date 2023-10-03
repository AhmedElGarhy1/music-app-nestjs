import * as bcrypt from 'bcryptjs';
// profile.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    //@InjectRepository(User) private readonly authRepository: Repository<User>,
    private readonly usersService: UsersService, // private readonly a:
  ) {}

  async findByEmail(email: string) {
    return Promise.resolve({} as User);
  }

  async signup(data: CreateUserDto) {
    this.usersService.checkUniqueness(data.email, data.username);

    // create salt & hash
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(data.password, 10);

    // const temp: User = {
    //   salt,
    //   password: hash,
    //   email: data.email,
    //   auth: {
    //     facebookId: null,
    //     gmailId: null,
    //     validEmail: null,
    //   },
    //   profile: new Profile(),
    //   roles: [RoleEnum.USER],
    //   id: ""
    // };
    // profile
    // const profile = await this.profilesService.create(data)

    this.usersService.create(data);
  }

  async signin(email: string, password: string) {}

  // Use AuthRepository for database operations
}
