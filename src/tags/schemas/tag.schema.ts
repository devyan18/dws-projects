import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RGB, Tag as TagEntity } from '../entities/tag.entity';

export type TagDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag implements TagEntity {
  @Prop({ type: String })
  tag_name: string;

  @Prop({
    type: {
      red: Number,
      green: Number,
      blue: Number,
    },
  })
  tag_color: RGB;

  @Prop({ type: Boolean })
  white_font: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
