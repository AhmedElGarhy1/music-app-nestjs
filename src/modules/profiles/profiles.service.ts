import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
  ) {}

  async create(data: CreateProfileDto) {
    const profileInstance = this.repo.create(data);
    const profile = this.repo.save(profileInstance);
    return profile;
  }

  async checkUniqueness(phone: string) {
    const isExists = await this.repo.findOne({ phone });
    if (isExists) throw new BadRequestException('phone is already in use');
  }
}
