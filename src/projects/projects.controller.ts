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
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/wt-auth.guard';
import { UserDocument } from 'src/users/schemas/user.schema';

@UseGuards(JwtAuthGuard)
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    const user = req.user as UserDocument;

    return this.projectsService.create(createProjectDto, user._id.toString());
  }

  @Get('')
  findAll(@Request() req) {
    const user = req.user as UserDocument;

    return this.projectsService.findAll(user._id.toString());
  }

  @Get(':projectId')
  findOne(@Param('projectId') projectId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.projectsService.findOne(projectId, user._id.toString());
  }

  @Patch(':projectId')
  update(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    const user = req.user as UserDocument;
    return this.projectsService.update(
      projectId,
      updateProjectDto,
      user._id.toString(),
    );
  }

  @Delete(':projectId')
  remove(@Param('projectId') projectId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.projectsService.remove(projectId, user._id.toString());
  }

  @Patch(':projectId/logo')
  async uploadFile(
    @Param('projectId') projectId: string,
    @Body() { logo_url }: { logo_url: string },
    @Request() req,
  ) {
    const user = req.user as UserDocument;

    return this.projectsService.edit_logo(
      projectId,
      logo_url,
      user._id.toString(),
    );
  }

  @Put()
  async createStartProject(@Request() req) {
    const user = req.user as UserDocument;

    return this.projectsService.createDefaultProject(user._id.toString());
  }
}
