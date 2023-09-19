import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AuthModule,
  SongModule,
  MusicModule,
  SingerAlbumsModule,
  FavoritesModule,
  MusicianAlbumsModule,
  MusiciansModule,
  NotificationsModule,
  PlaylistsModule,
  ProfilesModule,
  TracksModule,
  SingersModule,
} from './modules';

const database = require('../ormconfig');

@Module({
  imports: [
    TypeOrmModule.forRoot(database),
    AuthModule,
    ProfilesModule,
    SingersModule,
    MusiciansModule,
    FavoritesModule,
    PlaylistsModule,
    SongModule,
    MusicModule,
    SingerAlbumsModule,
    MusicianAlbumsModule,
    NotificationsModule,
    TracksModule,
    AppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
