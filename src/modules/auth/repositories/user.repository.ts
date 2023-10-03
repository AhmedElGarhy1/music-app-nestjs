import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import bcrypt from 'bcryptjs';

export class UserRepository extends Repository<User> {
  //   async validatePassword(password: string): Promise<boolean> {
  //     const hash = await bcrypt.hash(password, this.salt);
  //     return hash === this.password;
  //   }
}
