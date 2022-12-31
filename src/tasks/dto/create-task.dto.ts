import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto implements Partial<Task> {
  @IsNotEmpty()
  task_description: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;

  @IsNotEmpty()
  project: string;

  @IsOptional()
  @IsArray()
  tags: string[];
}
