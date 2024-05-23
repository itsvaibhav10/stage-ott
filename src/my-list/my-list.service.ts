import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Movie } from 'src/Entities/movie.schema';
import { MyList } from 'src/Entities/mylist.schema';
import { TVShow } from 'src/Entities/tvshow.schema';
import { User } from 'src/Entities/user.schema';
import { ContentType } from 'src/common/enums/commonEnums';

@Injectable()
export class MyListService {
  constructor(
    @InjectModel('MyList') private readonly myListModel: Model<MyList>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    @InjectModel('TVShow') private readonly tvShowModel: Model<TVShow>,
  ) {}

  async addToMyList(
    userId: string,
    itemId: string,
    itemType: ContentType,
  ): Promise<boolean> {
    debugger;
    try {
      const myList = await this.myListModel.findOne({ userId });

      if (!myList) {
        const newList = new this.myListModel({
          userId,
          items: [{ itemId, itemType }],
        });
        await newList.save();
      }

      const exists = myList.items.some(
        (item) =>
          item.itemId.toString() === itemId && item.itemType === itemType,
      );

      if (!exists) {
        const newItem = {
          itemId: new mongoose.Types.ObjectId(itemId),
          itemType,
        };

        await this.myListModel.updateOne(
          { userId },
          { $push: { items: newItem } },
        );
      }
      return true
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  async removeFromMyList(userId: string, itemId: string): Promise<boolean> {
    try {
      const myList = await this.myListModel.findOne({ userId });

      if (!myList) {
        throw new NotFoundException('List not found');
      }

      myList.items = myList.items.filter(
        (item) => item.itemId.toString() !== itemId,
      );

      await myList.save();
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  async listMyItems(
    userId: string,
    page: number,
    limit: number,
  ): Promise<MyList> {
    try {
      const myList = await this.myListModel
        .findOne({ userId })
        .populate('items.itemId', 'title description')
        .skip((page - 1) * limit)
        .limit(limit);
      if (!myList) {
        throw new NotFoundException('List not found');
      }
      return myList;
    } catch (error) {
      return null;
    }
  }
}
