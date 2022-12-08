import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Comment as CommentEntity } from '../entities/comment.entity';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment implements CommentEntity {
  @Prop({ type: String })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Task' })
  task: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
