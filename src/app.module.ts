import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule} from '@nestjs/mongoose';
require('dotenv').config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MongoDB_Connection_String)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
