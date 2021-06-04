import * as mongoose from 'mongoose';

export const FilmSchema = new mongoose.Schema({
  name: String,
  watched: Boolean,
  genre: String,
  rate: Number,
});

mongoose.set('useFindAndModify', false);
