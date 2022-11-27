import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Tag as TagEntity } from '../entities/tag.entity';

export type TagDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag implements TagEntity {
  @Prop({ type: String })
  tag_name: string;

  @Prop({ type: String })
  tag_color: string;

  @Prop({ type: Boolean })
  white_font: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
