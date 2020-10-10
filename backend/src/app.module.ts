// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseService from './config/database.service';

@Module({
  imports: [TypeOrmModule.forRoot(databaseService)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
