import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Param,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { UserRegisterDto } from './dto';
import { assertUser } from '../auth/assert-user';
import { User } from '../entity/User';
import { register, sessionLogin } from '../auth/user-auth';
import { UserRepository } from '../repos';
import { getCustomRepository } from 'typeorm';

@Controller('user')
export class UserController {
  @Get('user-count')
  getUsersCount(): number {
    return 0;
  }

  @Post('add-user')
  @ApiResponse({ type: User, status: 201 })
  @Post()
  async addUser(@Body() userData: UserRegisterDto, @Req() request: Request) {
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
