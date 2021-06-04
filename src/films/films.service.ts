import { Film } from './interfaces/film.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InputFilm } from './inputs/film.input';

@Injectable()
export class FilmsService {
  constructor(@InjectModel('Film') private FilmModel: Model<Film>) {}

  async create(inputFilm: InputFilm): Promise<Film> {
    const createdFilm = new this.FilmModel(inputFilm);
    return createdFilm.save();
  }
  async delete(name: string): Promise<Film> {
    return this.FilmModel.findOneAndRemove({ name: name });
  }

  async findAll(): Promise<Film[]> {
    return this.FilmModel.find();
  }

  async getPage(offset: number, limit: number): Promise<Film[]> {
    return this.FilmModel.find({}, {}, { skip: offset, limit: limit });
  }

  async countAll(): Promise<number> {
    return this.FilmModel.count();
  }
}
