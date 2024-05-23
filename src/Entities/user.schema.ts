import { Schema, Document } from 'mongoose';
import { ContentType, Genre } from 'src/common/enums/commonEnums';

export const UserSchema = new Schema({
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: [{ type: String, enum: Object.values(Genre) }],
    dislikedGenres: [{ type: String, enum: Object.values(Genre) }],
  },
  watchHistory: [
    {
      contentId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'watchHistory.contentType',
      },
      contentType: { type: String, required: true, enum: ContentType },
      watchedOn: { type: Date, required: true },
      rating: { type: Number },
    },
  ],
});

export interface User extends Document {
  id: string;
  username: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: Array<{
    contentId: Schema.Types.ObjectId;
    contentType: ContentType;
    watchedOn: Date;
    rating?: number;
  }>;
}
