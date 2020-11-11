// dto structure from https://slacker.ro/2020/02/26/build-a-secure-nestjs-api-with-postgres/
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
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
}

export class LoginDto {
  @ApiProperty()
  email: string;

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
