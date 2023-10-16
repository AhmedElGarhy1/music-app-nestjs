import {
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoomsService } from './rooms.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../users/entities/user.entity';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoomsController {
  constructor(private readonly chatService: RoomsService) {}

  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    const room = await this.chatService.create(user.username, createRoomDto);
    return room;
  }

  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  @Get()
  async findAll(@CurrentUser() user: User) {
    const rooms = await this.chatService.findAll(user.username);
    return rooms;
  }

  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const rooms = await this.chatService.findById(id);
    return rooms;
  }

  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    updateRoomDto: UpdateRoomDto,
  ) {
    const rooms = await this.chatService.update(id, updateRoomDto);
    return rooms;
  }

  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const rooms = await this.chatService.remove(id);
    return rooms;
  }
}
