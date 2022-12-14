import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User as UserEntity } from '../entities/user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements UserEntity {
  @Prop({ type: String, unique: true })
  username: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: Boolean, default: false })
  isPremium: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Person' })
  person: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Project', autopopulate: true }],
  })
  projects: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag', autopopulate: true }] })
  tags: string[];

  @Prop({ type: String })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
