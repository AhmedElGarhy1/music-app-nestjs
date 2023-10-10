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
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'aws-sdk/clients/budgets';
import { AwsService } from 'src/common/modules/aws/aws.service';
import { AwsFolderEnum } from 'src/common/enums/aws-folder.enum';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
    private readonly awsService: AwsService,
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

  async uploadProfileImage(profileId: number, file: Express.Multer.File) {
    const profile = await this.findById(profileId);

    // check if file eixsts
    if (profile.image) {
      //       delete the old image before uploading a new one
      await this.awsService.deleteFile(profile.image);
    }
    const imagePath = await this.awsService.uploadFile(
      file,
      AwsFolderEnum.PROFILE_IMAGES,
    );
    profile.image = imagePath;

    const newProfile = await this.repo.save(profile);
    return newProfile;
  }

  async checkUniqueness(phone: string) {
    const isExists = await this.repo.findOne({ phone });
    if (isExists) throw new BadRequestException('phone is already in use');
  }
}
