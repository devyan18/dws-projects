import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findOne(userId: string) {
    return await this.userModel.findOne({ _id: userId });
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${userId} user`;
  }

  remove(userId: string) {
    return `This action removes a #${userId} user`;
  }

  async validateUserPassword(hash: string, password: string): Promise<boolean> {
    return await compare(password, hash);
  }

  async findByCredentials(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await this.validateUserPassword(
      user.password,
      password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async existUser(userId: string) {
    try {
      const user = await this.userModel.findOne({ _id: userId });
      return !!user;
    } catch (error) {
      return false;
    }
  }

  async isPremium(userId: string): Promise<boolean> {
    try {
      const user = await this.userModel.findById(userId);
      return user.isPremium;
    } catch (error) {
      return false;
    }
  }

  async addProjectToUser(userId: string, projectId: string) {
    const userFound = await this.existUser(userId);

    if (!userFound) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          projects: projectId,
        },
      },
      { new: true },
    );
  }

  async addTagToUser(userId: string, tagId: string) {
    const userFound = await this.existUser(userId);

    if (!userFound) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          tags: tagId,
        },
      },
      { new: true },
    );
  }

  async addPersonToUser(userId: string, personId: string) {
    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        person: personId,
      },
      { new: true },
    );
  }
}
