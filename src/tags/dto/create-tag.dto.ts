import { IsBoolean, IsHexColor, IsNotEmpty } from 'class-validator';
import { Tag } from '../entities/tag.entity';

export class CreateTagDto implements Partial<Tag> {
  @IsNotEmpty()
  tag_name: string;

  @IsNotEmpty()
  @IsHexColor()
  tag_color: string;

  @IsNotEmpty()
  @IsBoolean()
  white_font: boolean;
}
