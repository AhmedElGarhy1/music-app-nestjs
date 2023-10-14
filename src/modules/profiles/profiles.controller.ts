import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  //   @Get()
  //   async getAll() {
  //     const singers = await this.profilesService.findAll();
  //     return singers;
  //   }

  @Get()
  async findOne(@CurrentUser() user: User) {
    const profile = await this.profilesService.findById(+user.id);
    return profile;
  }

  @Patch('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @CurrentUser() user: User,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const profile = await this.profilesService.uploadProfileImage(
      +user.profileId,
      image,
    );
    return profile;
  }

  @Patch()
  async update(@CurrentUser() user: User, @Body() songData: UpdateProfileDto) {
    const profile = await this.profilesService.updateById(+user.id, songData);
    return profile;
  }
}
