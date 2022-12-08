import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto implements Partial<User> {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsArray()
  projects: string[];

  @IsOptional()
  @IsArray()
  tags: string[];
}
