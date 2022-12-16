import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly taskService: TasksService,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: string) {
    const newComment = await this.commentModel.create({
      ...createCommentDto,
      user: userId,
    });

    await this.taskService.addCommentToTask(
      createCommentDto.task,
      newComment._id.toString(),
      userId,
    );

    return newComment;
  }

  async findAll(taskId: string, userId: string) {
    return await this.commentModel
      .find({
        task: taskId,
        user: userId,
      })
      .sort({ createdAt: 1 });
  }

  async findOne(commentId: string, taskId: string, userId: string) {
    return await this.commentModel.findOne({
      _id: commentId,
      task: taskId,
      user: userId,
    });
  }

  async update(
    commentId: string,
    updateCommentDto: UpdateCommentDto,
    userId: string,
  ) {
    console.log(commentId);
    return await this.commentModel.findOneAndUpdate(
      { _id: commentId, user: userId },
      updateCommentDto,
      { new: true },
    );
  }

  async remove(taskId: string, commentId: string, userId: string) {
    await this.taskService.removeCommentToTask(taskId, commentId, userId);

    return await this.commentModel.findOneAndRemove({
      _id: commentId,
      user: userId,
    });
  }

  async removeAllCommentsFromTask(taskId: string, userId: string) {
    const comments = await this.commentModel.find({
      task: taskId,
      user: userId,
    });

    comments.forEach(async (comment) => {
      await this.remove(taskId, comment._id.toString(), userId);
    });
  }
}
