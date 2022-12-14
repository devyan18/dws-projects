import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Project as ProjectEntity } from '../entities/project.entity';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project implements ProjectEntity {
  @Prop({ type: String, default: 'Unknown' })
  project_title: string;

  @Prop({ type: String })
  repository_url: string;

  @Prop({ type: String })
  logo: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task', autopopulate: true }] })
  tasks: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
