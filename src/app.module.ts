import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AuthModule,
  FavoritesModule,
  NotificationsModule,
  PlaylistsModule,
  ProfilesModule,
  TracksModule,
} from './modules';
import { AwsModule } from './common/modules/aws/aws.module';
import config from './config';
import { NodemailerModule } from '@crowdlinker/nestjs-mailer';
import { EmailModule } from './common/modules/email/email.module';
import { UsersModule } from './modules/users/users.module';
import { TunesModule } from './modules/tunes/tunes.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { ArtistAlbumsModule } from './modules/artist-albums/artist-albums.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    NodemailerModule.forRoot(config.nodemailer),
    AuthModule,
    ProfilesModule,
    FavoritesModule,
    PlaylistsModule,
    NotificationsModule,
    TracksModule,
    AppModule,
    AwsModule,
    EmailModule,
    UsersModule,
    TunesModule,
    ArtistsModule,
    ArtistAlbumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
