import { Schema, Document } from 'mongoose';
import { Genre } from 'src/common/enums/commonEnums';

export const MovieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  genres: [{ type: String, enum: Object.values(Genre) }],
  releaseDate: { type: Date },
  director: { type: String },
  actors: [{ type: String }],
});

export interface Movie extends Document {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  releaseDate: Date;
  director: string;
  actors: string[];
}
