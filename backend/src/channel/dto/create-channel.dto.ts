// create-channel.dto.ts

import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ChannelVisibility } from './channel-visibility.enum'; // Import this from where you defined the enum

export class CreateChannelDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  admin: number;
  owner: number;
  banned: number;
  @IsEnum(ChannelVisibility)
  visibility: ChannelVisibility;
  memberIds: number;
  @IsString()
  @IsOptional()
  @MinLength(4) // You can set your own minimum length for passwords
  password?: string;
}
