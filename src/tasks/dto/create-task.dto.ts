import { IsArray, IsNotEmpty } from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto implements Partial<Task> {
  @IsNotEmpty()
  task_description: string;

  @IsNotEmpty()
  project: string;

  @IsArray()
  tags: string[];
}
