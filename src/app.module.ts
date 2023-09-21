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
import { AwsModule } from './common/modules/aws/aws.module';
import config from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
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
    AwsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
