import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { SongModule } from './modules/songs/songs.module';
import { MusicModule } from './modules/music/music.module';
import { SingerAlbumModule } from './modules/singer-album/singer-album.module';
import { database } from './config';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { MusicianAlbumsModule } from './modules/musician-albums/musician-albums.module';
import { MusiciansModule } from './modules/musicians/musicians.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { SingersModule } from './modules/singers/singers.module';

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
    SingerAlbumModule,
    MusicianAlbumsModule,
    NotificationsModule,
    TracksModule,
    AppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
