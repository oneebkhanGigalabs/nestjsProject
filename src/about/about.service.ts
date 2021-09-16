import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAboutDTO } from './dto/about.dto';
import { About } from './interfaces/about.interfaces';

@Injectable()
export class AboutService {
  constructor(@InjectModel('About') private AboutModel: Model<About>) {}

  async create(CreateAboutDTO: CreateAboutDTO) {
    const createdCat = new this.AboutModel(CreateAboutDTO);
    return createdCat.save();
  }

  async finalAll() {
    return await this.AboutModel.find().exec();
  }

  async findOne(id) {
    const customer = await this.AboutModel.findById(id);
    return customer;
  }

  async find(req) {
    return await this.AboutModel.find(req).exec();
  }

  async update(id, CreateAboutDTO: CreateAboutDTO) {
    return await this.AboutModel.findByIdAndUpdate(id, CreateAboutDTO, {
      new: true,
    });
  }

  async delete(id) {
    return await this.AboutModel.findByIdAndDelete(id);
  }
}
