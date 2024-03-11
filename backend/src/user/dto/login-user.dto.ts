// ./user/dto/login-user.dto.ts
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  pseudo: string;

  @IsNotEmpty()
  password: string;
}
