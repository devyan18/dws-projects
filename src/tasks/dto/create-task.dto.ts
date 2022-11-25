import { IsArray, IsNotEmpty } from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto implements Partial<Task> {
  @IsNotEmpty()
  task_desciption: string;

  @IsNotEmpty()
  project: string;

  @IsArray()
  tags: string[];
}
