import { IsArray, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Project } from '../entities/project.entity';

export class CreateProjectDto implements Partial<Project> {
  @IsNotEmpty()
  project_title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  repository_url: string;

  @IsOptional()
  @IsUrl()
  logo: string;

  @IsOptional()
  @IsArray()
  tasks: string[];
}
