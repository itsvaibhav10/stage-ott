import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyListService } from './my-list.service';
import { MyListController } from './my-list.controller';
import { MyListSchema } from 'src/Entities/mylist.schema';
import { UserSchema } from 'src/Entities/user.schema';
import { MovieSchema } from 'src/Entities/movie.schema';
import { TVShowSchema } from 'src/Entities/tvshow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MyList', schema: MyListSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Movie', schema: MovieSchema },
      { name: 'TVShow', schema: TVShowSchema },
    ]),
  ],
  providers: [MyListService],
  controllers: [MyListController],
})
export class MyListModule {}
