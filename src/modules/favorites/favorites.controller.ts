import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Favorite } from './entities/favorite.entity';
import { FavoritesService } from './favorites.service';
import { User } from '../users/entities/user.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Roles(RoleEnum.USER)
  async findMine(@CurrentUser() user: User): Promise<Favorite> {
    const favorite = this.favoritesService.findById(user.favoriteId);
    return favorite;
  }

  @Post()
  @Roles(RoleEnum.USER)
  async createItem(
    @CurrentUser() user: User,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    const favorite = await this.favoritesService.addFavoriteItem(
      user.favoriteId,
      createFavoriteDto,
    );
    if (!favorite) throw new NotFoundException('Song/Music id not found');
    return favorite;
  }

  @Delete(':id')
  @Roles(RoleEnum.USER)
  async remove(@Param('id') itemId: number) {
    const favorite = await this.favoritesService.removeFavoriteItem(itemId);
    if (!favorite) throw new NotFoundException('Song/Music id not found');
    return favorite;
  }
}
