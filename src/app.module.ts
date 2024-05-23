import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule} from '@nestjs/mongoose';
import { MyListModule } from './my-list/my-list.module';
require('dotenv').config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MongoDB_Connection_String), MyListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
