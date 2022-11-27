import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/wt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('')
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const user = req.user as UserDocument;

    return this.tasksService.create(createTaskDto, user._id.toString());
  }

  @Get('')
  findAll(@Request() req) {
    const user = req.user as UserDocument;
    return this.tasksService.findAll(user._id.toString());
  }

  @Get(':taskId')
  findOne(@Param('taskId') taskId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.tasksService.findOne(taskId, user._id.toString());
  }

  @Patch(':taskId')
  update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    const user = req.user as UserDocument;
    return this.tasksService.update(taskId, updateTaskDto, user._id.toString());
  }

  @Delete(':taskId')
  remove(@Param('taskId') taskId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.tasksService.remove(taskId, user._id.toString());
  }
}
