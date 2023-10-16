import { UpdateRoomDto } from './dto/update-room.dto';
import { Injectable, UseGuards, Post, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { UserJoinedRoom } from './entities/user-joined-room.entity';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @InjectRepository(Room) private readonly roomRepo: Repository<Room>,
    @InjectRepository(UserJoinedRoom)
    private readonly userJoinedRoomRepo: Repository<UserJoinedRoom>,
  ) {}

  async create(createdBy: string, createRoomDto: CreateRoomDto) {
    const room = this.roomRepo.create({ ...createRoomDto, createdBy });
    return await room.save();
  }

  async findAll(username: string) {
    const rooms = await this.roomRepo.find({ createdBy: username });
    return rooms;
  }

  async findById(roomId: number) {
    const room = await this.roomRepo.findOne(roomId);
    if (!room) throw new NotFoundException("This room doens't exists");
    return room;
  }

  async update(roomId: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findById(roomId);

    Object.assign(room, updateRoomDto);
    return await room.save();
  }
  async remove(roomId: number) {
    const room = await this.findById(roomId);

    const messageIds = room.messages.map((ele) => ele.id);
    await this.messageRepo.delete({ id: In(messageIds) });

    const userJoinedRoomIds = room.userJoinedRooms.map((ele) => ele.id);
    await this.userJoinedRoomRepo.delete({ id: In(userJoinedRoomIds) });

    return await this.roomRepo.remove(room);
  }
}
