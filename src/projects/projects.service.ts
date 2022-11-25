import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

const MAX_PROJECT_WITHOUT_PREMIUM = 3;
@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    const isPremium = await this.userService.isPremium(userId);
    const countProjects = (await this.findAll(userId)).length;

    if (!isPremium && countProjects == MAX_PROJECT_WITHOUT_PREMIUM) {
      throw new UnauthorizedException();
    }

    const project = await this.projectModel.create({
      ...createProjectDto,
      user: userId,
    });

    await this.userService.addProjectToUser(userId, project._id.toString());

    return project;
  }

  async findAll(userId: string) {
    return await this.projectModel.find({ user: userId });
  }

  async findOne(projectId: string, userId: string) {
    return await this.projectModel.findOne({ _id: projectId, user: userId });
  }

  async update(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ) {
    const projectFound = await this.existProject(projectId);

    if (!projectFound) {
      throw new HttpException('Project Not Found', HttpStatus.BAD_REQUEST);
    }

    return await this.projectModel.findOneAndUpdate(
      { _id: projectId, user: userId },
      updateProjectDto,
      { new: true },
    );
  }

  async remove(projectId: string, userId: string) {
    const projectFound = await this.existProject(projectId);

    if (!projectFound) {
      throw new HttpException('Project Not Found', HttpStatus.BAD_REQUEST);
    }

    return await this.projectModel.findOneAndDelete({
      _id: projectId,
      user: userId,
    });
  }

  async existProject(projectId: string) {
    try {
      return !!(await this.projectModel.findOne({ _id: projectId }));
    } catch (error) {
      return false;
    }
  }

  async addTaskToProject(projectId: string, taskId: string, userId: string) {
    const projectFound = await this.existProject(projectId);

    if (!projectFound) {
      throw new HttpException('Project Not Found', HttpStatus.BAD_REQUEST);
    }

    return await this.projectModel.findOneAndUpdate(
      {
        _id: projectId,
        user: userId,
      },
      {
        $push: {
          tasks: taskId,
        },
      },
      { new: true },
    );
  }
}
