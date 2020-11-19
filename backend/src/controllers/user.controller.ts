import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { AddUserDto } from './dto';
import { assertUser } from '../auth/assert-user';
import { User, Playlist } from '../entity';
import { register, sessionLogin } from '../auth/user-auth';
import { UserRepository, PlaylistRepository } from '../repos';
import { getCustomRepository } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userRepo: UserRepository) {}

  @Get(':id')
  @ApiResponse({ type: User, status: 201 })
  async getUserInfo(@Param() params) {
    return await this.userRepo.findById(params.id);
  }

  @Get(':id/playlists')
  @ApiResponse({ type: Playlist, status: 201, isArray: true })
  async getUserPlaylists(@Param() params) {
    console.log('api ' + params);
    return await this.userRepo.findOne(params.id, { relations: ['playlists'] });
  }

  @Post('add-user')
  @ApiResponse({ type: User, status: 201 })
  async addUser(@Body() userData: AddUserDto, @Req() request: Request) {
    const {
      email,
      password,
      firstName,
      lastName,
      birthday,
      username,
    } = userData;
    const userRepo = getCustomRepository(UserRepository);

    const existingUser = await userRepo.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new UnauthorizedException(
        'Username is unavailable. Please choose another.',
      );
    }
    const { id: oktaId } = await register({
      email,
      password,
      firstName,
      lastName,
    });
    await assertUser(oktaId, email, firstName, lastName, birthday, username);
    const session = await sessionLogin({ username, password });
    request.res.cookie('sessionId', session.sessionId);
    return session;
  }
}
