import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Person as PersonEntity } from '../entities/person.entity';

export type PersonDocument = HydratedDocument<Person>;

@Schema({ timestamps: true })
export class Person implements PersonEntity {
  @Prop({ type: String })
  first_name: string;

  @Prop({ type: String })
  last_name: string;

  @Prop({ type: String })
  full_name: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
