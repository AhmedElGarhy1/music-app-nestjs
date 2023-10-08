import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '../auth/entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

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
    const singer = await this.profilesService.findById(+user.id);
    return singer;
  }

  @Patch()
  async update(@CurrentUser() user: User, @Body() songData: UpdateProfileDto) {
    const singer = await this.profilesService.updateById(+user.id, songData);
    return singer;
  }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string) {
  //     const singer = await this.profilesService.deleteById(+id);
  //     return singer;
  //   }
}
