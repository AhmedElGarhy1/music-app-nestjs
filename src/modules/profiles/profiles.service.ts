import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
  ) {}

  async findById(id: number) {
    const profile = await this.repo.findOne(id);
    if (!profile) {
      throw new NotFoundException('profile not found');
    }
    return profile;
  }

  async create(data: CreateProfileDto) {
    const profileInstance = this.repo.create(data);
    const profile = this.repo.save(profileInstance);
    return profile;
  }

  async updateById(id: number, data: UpdateProfileDto) {
    const profile = await this.findById(id);
    if (data.phone) {
      await this.checkUniqueness(data.phone);
    }

    Object.assign(profile, data);
    return await this.repo.save(profile);
  }

  async checkUniqueness(phone: string) {
    const isExists = await this.repo.findOne({ phone });
    if (isExists) throw new BadRequestException('phone is already in use');
  }
}
