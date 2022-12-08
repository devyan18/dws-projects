import { IsNotEmpty } from 'class-validator';
import { Comment } from '../entities/comment.entity';

export class CreateCommentDto implements Partial<Comment> {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  task: string;
}
