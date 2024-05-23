import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Query,
  Body,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { MyListService } from './my-list.service';
import { ContentType } from '../common/enums/commonEnums';
import { createResponse } from '../util/response';

@Controller('mylist')
export class MyListController {
  constructor(private readonly myListService: MyListService) {}

  @Post('add')
  async addToMyList(
    @Req() request: Request,
    @Body() body: { itemId: string; itemType: ContentType },
  ) {
    const userId = '664f030952787ec1250f5b52';
    const result = await this.myListService.addToMyList(
      userId,
      body.itemId,
      body.itemType,
    );
    if (result) {
      return createResponse(
        'Success',
        'Item added to your list successfully',
        result,
      );
    } else {
      return createResponse('Fail', 'Failed to add item to your list');
    }
  }

  @Delete('remove/:itemId')
  async removeFromMyList(
    @Req() request: Request,
    @Param('itemId') itemId: string,
  ) {
    const userId = '664f030952787ec1250f5b52';
    const result = await this.myListService.removeFromMyList(userId, itemId);
    if (result) {
      return createResponse(
        'Success',
        'Item removed from your list successfully',
        result,
      );
    } else {
      return createResponse('Fail', 'Failed to remove item from list');
    }
  }

  @Get()
  async listMyItems(
    @Req() request: Request,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const userId = '664f030952787ec1250f5b52';
    const result = await this.myListService.listMyItems(
      userId,
      Number(page),
      Number(limit),
    );

    if (result) {
      return createResponse('Success', 'list fetch successfully', result);
    } else {
      return createResponse('Fail', 'Failed to fetch list');
    }
  }
}
