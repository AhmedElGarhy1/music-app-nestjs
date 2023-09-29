import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  //   constructor(@InjectRepository(User) private repo: Repository<User>) {}
  //   findAll() {
  //     return this.repo.find();
  //   }
  //   async create(email: string, password: string) {
  //     const user = this.repo.create({ email, password });
  //     return this.repo.save(user);
  //   }
  //   async findById(id: number) {
  //     if (!id) {
  //       throw new NotFoundException('couldent find the user');
  //     }
  //     const user = await this.repo.findOne({ id });
  //     return user;
  //   }
  //   async findByEmail(email: string) {
  //     const user = await this.repo.findOne({ email });
  //     return user;
  //   }
  //   async deleteById(id: number) {
  //     if (!id) {
  //       throw new NotFoundException('couldent find the user');
  //     }
  //     const user = await this.repo.findOne({ id });
  //     return this.repo.remove(user);
  //   }
  //   async update(id: number, userData: Partial<User>) {
  //     const user = await this.repo.findOne({ id });
  //     if (!user) throw new NotFoundException("Coulden't Find this User");
  //     Object.assign(user, userData);
  //     return this.repo.save(user);
  //   }
}
