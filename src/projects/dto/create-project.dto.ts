import { IsArray, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Project } from '../entities/project.entity';

export class CreateProjectDto implements Partial<Project> {
  @IsNotEmpty()
  project_title: string;

  @IsNotEmpty()
  @IsUrl()
  repository_url: string;

  @IsOptional()
  @IsArray()
  tasks: string[];
}
