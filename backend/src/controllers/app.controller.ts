import {
  Controller,
  Post,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from '../services/app.service';
import { LoginResponseDto, LoginDto } from './dto';
import { sessionLogin } from '../auth/user-auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sign-in')
  @ApiResponse({ type: LoginResponseDto, status: 201 })
  async login(
    @Body() data: LoginDto,
    @Req() request: Request,
  ): Promise<LoginResponseDto> {
    const { username, password } = data;
    try {
      const session = await sessionLogin({ username, password });
      request.res.cookie('sessionId', session.sessionId);
      return session;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
