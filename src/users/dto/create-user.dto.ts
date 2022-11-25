import { IsArray, IsBoolean, IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto implements User {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  isPremium: boolean;

  @IsNotEmpty()
  person: string;

  @IsArray()
  projects: string[];

  @IsArray()
  tags: string[];
}
