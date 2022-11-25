import { IsArray, IsNotEmpty } from 'class-validator';
import { Project } from '../entities/project.entity';

export class CreateProjectDto implements Project {
  @IsNotEmpty()
  repository_url: string;

  @IsArray()
  tasks: string[];

  @IsNotEmpty()
  user: string;
}
