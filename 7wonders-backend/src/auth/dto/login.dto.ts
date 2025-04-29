import {
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
