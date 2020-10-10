// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, UserController } from '../controllers/';
import { AppService } from '../services/app.service';
import databaseService from '../config/database.service';

@Module({
  imports: [TypeOrmModule.forRoot(databaseService)],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
