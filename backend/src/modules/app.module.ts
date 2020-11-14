// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AppController,
  UserController,
  SongController,
  PlaylistController,
} from '../controllers/';
import { AppService } from '../services/app.service';
import databaseService from '../config/database.service';
import { UserRepository, PlaylistRepository, SongRepository } from '../repos';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseService),
    TypeOrmModule.forFeature([
      UserRepository,
      PlaylistRepository,
      SongRepository,
    ]),
  ],
  controllers: [
    AppController,
    UserController,
    SongController,
    PlaylistController,
  ],
  providers: [AppService],
})
export class AppModule {}
