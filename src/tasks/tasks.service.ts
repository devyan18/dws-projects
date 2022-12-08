import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    private readonly projectService: ProjectsService,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const task = await this.taskModel.create({
      ...createTaskDto,
      user: userId,
    });

    await this.projectService.addTaskToProject(
      createTaskDto.project,
      task._id.toString(),
      userId,
    );

    return task;
  }

  async findAll(projectId: string, userId: string) {
    return await this.taskModel.find({ user: userId, project: projectId });
  }

  async findOne(projectId: string, taskId: string, userId: string) {
    return await this.taskModel.findOne({
      _id: taskId,
      user: userId,
      project: projectId,
    });
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto, userId: string) {
    return await this.taskModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      updateTaskDto,
      { new: true },
    );
  }

  async remove(taskId: string, userId: string) {
    return await this.taskModel.findOneAndDelete({ _id: taskId, user: userId });
  }

  async toggleComplete(taskId: string, userId: string) {
    const task = await this.taskModel.findOne({ _id: taskId, user: userId });

    if (!task) {
      throw new HttpException('Task Not Found', 404);
    }

    return await this.taskModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      { completed: !task.completed },
      { new: true },
    );
  }

  async existTask(taskId: string, userId: string): Promise<boolean> {
    try {
      return !!(await this.taskModel.findOne({ _id: taskId, user: userId }));
    } catch (error) {
      return false;
    }
  }

  async addTagToTask(taskId: string, tagId: string, userId: string) {
    const taskIsFound = await this.existTask(taskId, userId);

    if (taskIsFound) {
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
    }

    return await this.taskModel.findOneAndUpdate(
      { _id: taskId },
      {
        $push: {
          tags: tagId,
        },
      },
      { new: true },
    );
  }

  async deleteAlltasksByProject(projectId: string, userId: string) {
    return await this.taskModel.deleteMany({
      user: userId,
      project: projectId,
    });
  }

  async addCommentToTask(taskId: string, commentId: string, userId: string) {
    return await this.taskModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      {
        $push: {
          comments: commentId,
        },
      },
      { new: true },
    );
  }

  async removeCommentToTask(taskId: string, commentId: string, userId: string) {
    return await this.taskModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      {
        $pull: {
          comments: commentId,
        },
      },
      { new: true },
    );
  }
}
