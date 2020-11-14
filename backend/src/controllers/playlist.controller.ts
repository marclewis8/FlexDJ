import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Get,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AddPlaylistDto } from './dto';
import { SongRepository, PlaylistRepository, UserRepository } from '../repos';
import { Song, Playlist } from '../entity';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private songRepo: SongRepository,
    private playlistRepo: PlaylistRepository,
    private userRepo: UserRepository,
  ) {}
  @Post('add')
  @ApiResponse({ type: Playlist, status: 201 })
  async addPlaylist(@Body() playlistData: AddPlaylistDto) {
    const { name, genre, icon, userId } = playlistData;
    const currUser = await this.userRepo.findById(userId);
    return await this.playlistRepo.createAndSave(
      genre,
      icon,
      name,
      [],
      currUser,
    );
  }

  @Post('remove/:playlistId')
  @ApiResponse({ type: Song, status: 201 })
  async removePlaylist(@Param() playlistId: string) {
    let existingPlaylist = await this.playlistRepo.findOne({
      where: { id: playlistId },
    });

    if (!existingPlaylist) {
      throw new NotFoundException('Desired playlist not found.');
    }
    return await this.playlistRepo.delete(playlistId);
  }

  @Post(':playlistId/remove/:songId')
  @ApiResponse({ type: Song, status: 201 })
  async removeSong(@Param() playlistId: string, songId: string) {
    let existingSong = await this.songRepo.findOne({
      where: { id: songId },
    });

    if (!existingSong) {
      throw new NotFoundException('This song does not exist.');
    }

    let existingPlaylist = await this.playlistRepo.findOne({
      where: { playlistId },
    });

    if (!existingPlaylist) {
      throw new NotFoundException('Desired playlist not found.');
    }
    return await this.playlistRepo.removeSong(existingPlaylist, existingSong);
  }

  @Get(':playlistId')
  @ApiResponse({ type: Playlist, status: 201 })
  async getPlaylist(@Param() id: string) {
    return await this.playlistRepo.findById(id);
  }

  @Get(':playlistId/songs')
  @ApiResponse({ type: Song, status: 201 })
  async getSongs(@Param() id: string) {
    let { songs } = await this.playlistRepo.findById(id);
    return songs;
  }
}
