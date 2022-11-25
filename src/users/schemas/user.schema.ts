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

  @Prop({ type: Boolean })
  isPremium: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Person' })
  person: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
