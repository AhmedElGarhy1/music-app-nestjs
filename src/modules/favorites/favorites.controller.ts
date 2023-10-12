import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
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
@Roles(RoleEnum.USER)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findMine(@CurrentUser() user: User): Promise<Favorite> {
    const favorite = this.favoritesService.findById(user.favoriteId);
    return favorite;
  }

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    const favorite = await this.favoritesService.addFavoriteItem(
      user.favoriteId,
      createFavoriteDto,
    );
    return favorite;
  }

  @Delete('id')
  async remove(@CurrentUser() user: User, @Param('id') itemId: number) {
    const favorite = await this.favoritesService.removeFavoriteItem(
      user.favoriteId,
      itemId,
    );
    return favorite;
  }
}
