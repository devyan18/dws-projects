import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(createTagDto: CreateTagDto, userId: string) {
    const tag = await this.tagModel.create({ ...createTagDto, user: userId });

    await this.userService.addTagToUser(userId, tag._id.toString());

    return tag;
  }

  async findAll(userId: string) {
    return await this.tagModel.find({ user: userId });
  }

  async findOne(tagId: string, userId: string) {
    return await this.tagModel.findOne({ _id: tagId, user: userId });
  }

  async update(tagId: string, updateTagDto: UpdateTagDto, userId: string) {
    return await this.tagModel.findOneAndUpdate(
      { _id: tagId, user: userId },
      updateTagDto,
      { new: true },
    );
  }

  async remove(tagId: string, userId: string) {
    return await this.tagModel.findOneAndRemove({ _id: tagId, user: userId });
  }

  async existTag(tagId: string): Promise<boolean> {
    try {
      return !!(await this.tagModel.findOne({ _id: tagId }));
    } catch (error) {
      return false;
    }
  }
}
