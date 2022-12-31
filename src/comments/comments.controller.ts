import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/wt-auth.guard';
import { UserDocument } from 'src/users/schemas/user.schema';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    const user = req.user as UserDocument;
    return this.commentsService.create(createCommentDto, user._id.toString());
  }

  @Get(':taskId')
  findAll(@Param('taskId') taskId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.commentsService.findAll(taskId, user._id.toString());
  }

  @Get(':taskId/:commentId')
  findOne(
    @Param('commentId') commentId: string,
    @Param('taskId') taskId: string,
    @Request() req,
  ) {
    const user = req.user as UserDocument;
    return this.commentsService.findOne(commentId, taskId, user._id.toString());
  }

  @Patch(':commentId')
  update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req,
  ) {
    const user = req.user as UserDocument;
    return this.commentsService.update(
      commentId,
      updateCommentDto,
      user._id.toString(),
    );
  }

  @Delete(':taskId')
  removeAll(@Param('taskId') taskId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.commentsService.removeAllCommentsFromTask(
      taskId,
      user._id.toString(),
    );
  }

  @Delete(':taskId/:commentId')
  remove(
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string,
    @Request() req,
  ) {
    const user = req.user as UserDocument;
    return this.commentsService.remove(taskId, commentId, user._id.toString());
  }
}
