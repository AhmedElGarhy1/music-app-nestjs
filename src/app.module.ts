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
import { NodemailerModule } from '@crowdlinker/nestjs-mailer';
import { EmailModule } from './common/modules/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    NodemailerModule.forRoot(config.nodemailer),
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
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
