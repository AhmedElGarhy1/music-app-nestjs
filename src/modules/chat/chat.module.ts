import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { UserJoinedRoom } from './entities/user-joined-room.entity';
import { Message } from './entities/message.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, UserJoinedRoom, Message])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class ChatModule {}
