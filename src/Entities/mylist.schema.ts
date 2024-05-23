import { Schema, Document } from 'mongoose';
import { ContentType } from 'src/common/enums/commonEnums';

export const MyListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'items.itemType',
      },
      itemType: { type: String, enum: ContentType, required: true },
    },
  ],
});

export interface MyList extends Document {
  userId: Schema.Types.ObjectId;
  items: Array<{
    itemId: Schema.Types.ObjectId;
    itemType: ContentType;
  }>;
}
