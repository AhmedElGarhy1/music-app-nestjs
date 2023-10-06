import * as bcrypt from 'bcryptjs';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';
import { RoleEnum } from 'src/common/enums/role.enum';
import { RegisterUserDto } from './dto/register-user.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { EmailService } from 'src/common/modules/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { FavoritesService } from '../favorites/favorites.service';
import { ForgetPasswordDto } from './dto/forget-password.dto';

@Injectable()
export class AuthService {
  constructor(
    //@InjectRepository(User) private readonly authRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly favoriteService: FavoritesService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: RegisterUserDto) {
    await this.usersService.checkUniqueness(data.email, data.username);
    await this.profilesService.checkUniqueness(data.phone);

    // create salt & hash
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(data.password, salt);
    const profile = await this.profilesService.create(data);
    const favorite = await this.favoriteService.create();

    //? assign data
    data.salt = salt;
    data.password = hash;
    data.profile = profile;
    data.roles = [RoleEnum.USER];
    data.favorite = favorite;

    const user = await this.usersService.create(data);
    await this.emailService.createEmailToken(data.email);
    await this.emailService.sendVerificationEmail(data.email);
    const accessToken = this.generateAccessToken({ email: user.email });

    return { user, accessToken };
  }

  async signin(data: SigninUserDto) {
    // validate email
    const user = await this.usersService.findByEmail(data.email);
    if (!user) throw new BadRequestException("Email doen't exist");

    // validate password
    const isValid = await user.validatePassword(data.password);
    if (!isValid) throw new BadRequestException('invalid password');
    const accessToken = this.generateAccessToken({ email: user.email });

    return { user, accessToken };
  }

  async verifyEmail(emailToken: string) {
    const isExist = await this.emailService.findByEmailToken(emailToken);

    if (!isExist) {
      throw new BadRequestException('email token not valid');
    }

    const user = await this.usersService.findByEmail(isExist.email);
    if (!user) {
      throw new NotFoundException('Invalid email');
    }

    user.auth.validEmail = true;
    const newUser = await user.save();
    await isExist.remove();
    return newUser;
  }

  generateAccessToken(payload: IJwtPayload) {
    return this.jwtService.sign(payload);
  }

  async sendForgettenPasswordEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    console.log(user);
    if (!user) throw new NotFoundException('email doesnt exist');

    await this.emailService.sendForgettenPasswordEmail(email);
    return user;
  }

  async resetPassword(data: ForgetPasswordDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException('Invalid email');
    }

    const passwordEntity = await this.emailService.findByPasswordToken(
      data.passwordToken,
    );

    if (!passwordEntity) {
      throw new BadRequestException('password token not valid');
    }

    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(data.newPassword, salt);

    user.salt = salt;
    user.password = hash;

    const newUser = await user.save();
    await passwordEntity.remove();
    return newUser;
  }

  // for testing
  async sentTempEmail(email: string) {
    return this.emailService.sentTempEmail(email);
  }
}
