import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection } from 'mongoose';

describe('MyListController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();

    mongoConnection = (await connect(uri)).connection;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
    await app.close();
  });

  it('/mylist/add (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/mylist/add')
      .send({
        itemId: '60c72b2f9b1d8b2a6c8f3e81',
        itemType: 'TVShow',
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('Success');
    expect(response.body.message).toBe('Item added to your list successfully');
  });

  it('/mylist/remove/:itemId (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(
      '/mylist/remove/60c72b2f9b1d8b2a6c8f3e81',
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Success');
    expect(response.body.message).toBe(
      'Item removed from your list successfully',
    );
  });

  it('/mylist (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/mylist')
      .query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Success');
    expect(response.body.message).toBe('list fetch successfully');
  });
});
