import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RefreshDto {
  @IsUUID()
  userId: string;

  @IsString()
  refreshToken: string;
}
