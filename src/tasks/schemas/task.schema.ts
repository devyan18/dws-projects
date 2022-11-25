import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task as TaskEntity } from '../entities/task.entity';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task implements TaskEntity {
  @Prop({ type: String })
  task_desciption: string;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag', autopopulate: true }] })
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
