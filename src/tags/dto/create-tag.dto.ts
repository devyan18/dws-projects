import {
  IsBoolean,
  IsInstance,
  IsNotEmpty,
  IsNotEmptyObject,
} from 'class-validator';
import { RGB, Tag } from '../entities/tag.entity';

export class CreateTagDto implements Partial<Tag> {
  @IsNotEmpty()
  tag_name: string;

  @IsNotEmptyObject()
  @IsInstance(RGB)
  tag_color: RGB;

  @IsNotEmpty()
  @IsBoolean()
  white_font: boolean;
}
