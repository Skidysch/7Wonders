import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  refreshToken?: string;
}