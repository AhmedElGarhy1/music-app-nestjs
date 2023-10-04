import * as bcrypt from 'bcryptjs';
// profile.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateProfileDto } from '../profiles/dto/create-profile.dto';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Profile } from '../profiles/entities/profile.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerification } from './entities/email-verification.entity';
import { EntityManager, Repository } from 'typeorm';
import { Nodemailer, NodemailerDrivers } from '@crowdlinker/nestjs-mailer';

@Injectable()
export class AuthService {
  constructor(
    //@InjectRepository(User) private readonly authRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    @InjectRepository(EmailVerification)
    private readonly emailRepo: Repository<EmailVerification>,
    private readonly nodeMailserService: Nodemailer<NodemailerDrivers.SMTP>,
    private readonly entityManager: EntityManager,
  ) {}

  async findByEmail(email: string) {
    return Promise.resolve({} as User);
  }

  async signup(data: RegisterUserDto) {
    this.usersService.checkUniqueness(data.email, data.username);

    // create salt & hash
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(data.password, salt);
    const profile = await this.profilesService.create(data);

    //? assign data
    data.salt = salt;
    data.password = hash;
    data.profile = profile;
    data.roles = [RoleEnum.USER];

    const user = await this.usersService.create(data);
    await this.createEmailToken(data.email);
    await this.sendEmailVerification(data.email);

    return user;
  }

  async signin(data: SigninUserDto) {
    // validate email
    const user = await this.usersService.findByEmail(data.email);
    if (!user) throw new BadRequestException("Email doen't exist");

    // validate password
    const isValid = await user.validatePassword(data.password);
    if (!isValid) throw new BadRequestException('invalid password');

    return user;
  }

  // async forgetPassword(data: ForgetPasswordDto) {
  //   // validate email
  //   const user = await this.usersService.findByEmail(data.email);
  //   if (!user) throw new BadRequestException("Email doen't exist");

  //   // generate token

  //   // generate otp

  //   emailRepo
  //   return user;
  // }

  async createEmailToken(email: string) {
    const isExist = await this.emailRepo.findOne({ email });
    // exist and less that 15 minutes
    if (isExist && this.isDateLessThat(isExist.timestamp, 15)) {
      throw new BadRequestException('email has sent recently');
    }

    const emailToken = (Math.floor(Math.random() * 99999) + 1000).toString();
    this.emailRepo.create({
      email,
      timestamp: new Date(),
      emailToken,
    });
    return emailToken;
  }

  async sendEmailVerification(email: string) {
    const isExist = await this.emailRepo.findOne({ email });

    if (!(isExist && isExist.emailToken)) {
      throw new BadRequestException('Please Register first');
    }

    const url = `http://localhost:3000/email/verify/${isExist.emailToken}`;
    return this.nodeMailserService
      .sendMail({
        from: 'Company <gemater.g@gmail.com>',
        to: email,
        subject: 'Musci-Land _Verify Email_',
        html: `
        <h1>Thx for registration please verify your eamil</h1>
        <a href="${url}">Verify</a>
        `,
      })
      .then((info) => {
        console.log('Email sent successfully ' + info.messageId);
      })
      .catch((err) => {
        console.log('Faild to send email', err);
      });
  }

  async verifyEmail(emailToken: string) {
    const isExist = await this.emailRepo.findOne({ emailToken });
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

  private async isDateLessThat(date: Date, minutes: number) {
    return (new Date().getTime() - date.getTime()) / 6000 < minutes;
  }

  // Use AuthRepository for database operations
}
