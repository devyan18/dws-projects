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
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtAuthGuard } from 'src/auth/wt-auth.guard';
import { UserDocument } from 'src/users/schemas/user.schema';

@UseGuards(JwtAuthGuard)
@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('')
  create(@Body() createTagDto: CreateTagDto, @Request() req) {
    const user = req.user as UserDocument;
    return this.tagsService.create(createTagDto, user._id.toString());
  }

  @Get('')
  findAll(@Request() req) {
    const user = req.user as UserDocument;
    return this.tagsService.findAll(user._id.toString());
  }

  @Get(':tagId')
  findOne(@Param('tagId') tagId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.tagsService.findOne(tagId, user._id.toString());
  }

  @Patch(':tagId')
  update(
    @Param('tagId') tagId: string,
    @Body() updateTagDto: UpdateTagDto,
    @Request() req,
  ) {
    const user = req.user as UserDocument;
    return this.tagsService.update(tagId, updateTagDto, user._id.toString());
  }

  @Delete(':tagId')
  remove(@Param('tagId') tagId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.tagsService.remove(tagId, user._id.toString());
  }
}
