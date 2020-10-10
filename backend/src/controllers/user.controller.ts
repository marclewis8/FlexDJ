import { Controller, Get, Post, Param, Query } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUsers(): string {
    return 'This request returns all users';
  }

  @Get()
  getUsersCount(): number {
    return 0;
  }

  @Get(':id')
  getUserId(@Param('id') id: number): string {
    console.log(id);
    return `this request returns the user with id ${id}`;
  }

  @Post()
  addUser(@Query('req') req): string {
    const { name, email } = req;
    console.log(`${name} - ${email}`);
    return 'this request will add a user to the database';
  }
}
