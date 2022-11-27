import { IsArray, IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto implements Partial<User> {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsArray()
  projects: string[];

  @IsArray()
  tags: string[];
}
