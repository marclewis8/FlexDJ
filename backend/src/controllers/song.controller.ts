import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Get,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AddSongDto } from './dto';
import { SongRepository, PlaylistRepository } from '../repos';
import { getCustomRepository } from 'typeorm';
import { Song } from '../entity';

@Controller('song')
export class SongController {
  constructor(
    private songRepo: SongRepository,
    private playlistRepo: PlaylistRepository,
  ) {}
  @Post('add')
  @ApiResponse({ type: Song, status: 201 })
  async addSong(@Body() songData: AddSongDto) {
    const { name, url, icon, artist, externalId, playlistId } = songData;

    let existingSong = await this.songRepo.findOne({
      where: { url },
    });

    if (!existingSong) {
      existingSong = await this.songRepo.createAndSave(
        artist,
        icon,
        externalId,
        name,
        url,
      );
    }
    let existingPlaylist = await this.playlistRepo.findOne({
      where: { playlistId },
    });

    if (!existingPlaylist) {
      throw new NotFoundException('Desired playlist not found.');
    }

    return await this.playlistRepo.addSong(existingPlaylist, existingSong);
  }

  @Post('remove/:id')
  @ApiResponse({ type: Song, status: 201 })
  async removeSong(@Param() params) {
    let existingSong = await this.songRepo.findOne({
      where: { id: params.id },
    });

    if (!existingSong) {
      throw new NotFoundException('Desired song not found.');
    }
    return await this.songRepo.delete(params.id);
  }

  @Get(':id')
  @ApiResponse({ type: Song, status: 201 })
  async getSong(@Param() params) {
    return await this.songRepo.findById(params.id);
  }
}
