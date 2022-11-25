import { IsArray, IsNotEmpty } from 'class-validator';
import { Project } from '../entities/project.entity';

export class CreateProjectDto implements Partial<Project> {
  @IsNotEmpty()
  repository_url: string;

  @IsArray()
  tasks: string[];
}
