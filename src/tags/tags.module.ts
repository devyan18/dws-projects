import { forwardRef, Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
