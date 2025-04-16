import {
  IsEmail,
  IsStrongPassword,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must be at least 8 symbols length, and must contain at least one uppercase and lowercase letters, one digit and one special symbol',
    },
  )
  password: string;
}
