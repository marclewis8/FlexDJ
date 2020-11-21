import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
export class AddSongDto {
  @ApiProperty()
  @IsEmail()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  artist: string;

  @ApiProperty()
  @IsNotEmpty()
  playlistId: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  preview: string;

  @ApiProperty()
  externalId: string;
}
export class AddPlaylistDto {
  @ApiProperty()
  @IsEmail()
  name: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  userId: string;
}

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  userEmail: string;

  @ApiProperty()
  userId: string;
}
