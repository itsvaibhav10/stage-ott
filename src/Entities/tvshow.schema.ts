import { Schema, Document } from 'mongoose';
import { Genre } from 'src/common/enums/commonEnums';

const EpisodeSchema = new Schema({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date },
  director: { type: String },
  actors: [{ type: String }],
});

export const TVShowSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  genres: [{ type: String, enum: Object.values(Genre) }],
  episodes: [EpisodeSchema],
});

export interface TVShow extends Document {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  episodes: Array<{
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
  }>;
}
