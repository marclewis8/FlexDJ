import { Body, Controller, Get, Post, Req, Param, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { UserRegisterDto } from './dto';
import { assertUser } from '../auth/assert-user';
import { User } from '../entity/User';
import { register, sessionLogin } from '../auth/user-auth';

@Controller('user')
// @UseGuards(IsAuthenticatedGuard)
export class UserController {
  @Get('all')
  getUsers(): string {
    return 'This request returns all users';
  }

  @Get('user-count')
  getUsersCount(): number {
    return 0;
  }

  @Get('curr')
  getCurrentUser(@Query('req') req): number {
    return 0;
  }

  @Get(':id')
  getUserId(@Param('id') id: number): string {
    return `this request returns the user with id ${id}`;
  }

  @Post('add-user')
  @ApiResponse({ type: User, status: 201 })
  @Post()
  async addUser(@Body() userData: UserRegisterDto, @Req() request: Request) {
    const { email, password, firstName, lastName, birthday } = userData;
    const { id: oktaId } = await register({
      email,
      password,
      firstName,
      lastName,
    });
    const user = await assertUser(oktaId, email, firstName, lastName, birthday);
    const { sessionId } = await sessionLogin({ email, password });
    request.res.cookie('sessionId', sessionId);

    return { id: user.id, email, firstName, lastName };
  }
}
