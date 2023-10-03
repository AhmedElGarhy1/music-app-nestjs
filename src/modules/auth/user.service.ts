import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: UserRepository) {}

  findAll() {
    const users = this.repo.find();
    return users;
  }

  async create(data: AuthDto) {
    await this.checkUniqueness(data.email, data.username);

    // const tempUser = {
    //   auth: {
    //     facebookId: null,
    //     gmailId: null,
    //     validEmail: null,
    //   },
    // };

    const user = this.repo.create({ ...data });
    return;

    return this.repo.save(user);
  }

  async findById(id: number) {
    if (!id) {
      throw new NotFoundException('couldent find the user');
    }
    const user = await this.repo.findOne({ id });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOne({ email });
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.repo.findOne({ username });
    return user;
  }

  async deleteById(id: number) {
    const user = await this.findById(id);
    return this.repo.remove(user);
  }

  async update(id: number, userData: Partial<User>) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException("Coulden't Find this User");
    Object.assign(user, userData);
    return this.repo.save(user);
  }

  async checkUniqueness(email: string, username: string) {
    // check if email exists

    const isEmailExists = await this.findByEmail(email);
    if (isEmailExists) throw new NotFoundException('email is already in use');

    const isUsernameExists = await this.findByUsername(username);
    if (isUsernameExists)
      throw new NotFoundException('username is already in use');
  }
}
