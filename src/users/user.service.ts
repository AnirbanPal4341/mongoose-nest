import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async add(user: UserDto): Promise<User> {
    const newUser = new this.userModel({
      email: user.email,
      name: user.name,
      pincode: user.pincode,
    });

    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }

  async update(id: string, user: UserDto): Promise<any> {
    const data = await this.userModel.findOne({ _id: id }).exec();
    if (!data) {
      throw new HttpException('Incorrect ID', HttpStatus.BAD_REQUEST);
    }
    const updatedUser = {
      email: user.email,
      name: user.name,
      pincode: user.pincode,
    };
    return await this.userModel.updateOne({ _id: id }, updatedUser);
  }
}
