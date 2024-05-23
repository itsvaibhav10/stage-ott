import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './Entities/user.schema';
import { Movie } from './Entities/movie.schema';
import { TVShow } from './Entities/tvshow.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel = app.get<Model<User>>(getModelToken('User'));
  const movieModel = app.get<Model<Movie>>(getModelToken('Movie'));
  const tvShowModel = app.get<Model<TVShow>>(getModelToken('TVShow'));

  const sampleUsers = [
    {
      username: 'john_doe',
      preferences: {
        favoriteGenres: ['Action', 'Comedy'],
        dislikedGenres: ['Horror'],
      },
      watchHistory: [
        {
          contentId: '60c72b2f9b1d8b2a6c8f3e7e',
          contentType: 'Movie',
          watchedOn: new Date('2024-05-01'),
          rating: 5,
        },
      ],
    },
    {
      username: 'jane_smith',
      preferences: {
        favoriteGenres: ['Drama', 'Romance'],
        dislikedGenres: ['SciFi'],
      },
      watchHistory: [
        {
          contentId: '60c72b2f9b1d8b2a6c8f3e80',
          contentType: 'TVShow',
          watchedOn: new Date('2024-04-15'),
          rating: 4,
        },
      ],
    },
  ];

  const sampleMovies = [
    {
      _id: '60c72b2f9b1d8b2a6c8f3e7e',
      title: 'Action Movie',
      description: 'An action-packed adventure.',
      genres: ['Action'],
      releaseDate: new Date('2023-01-01'),
      director: 'John Director',
      actors: ['Actor A', 'Actor B'],
    },
    {
      _id: '60c72b2f9b1d8b2a6c8f3e7f',
      title: 'Romantic Comedy',
      description: 'A love story with laughs.',
      genres: ['Romance', 'Comedy'],
      releaseDate: new Date('2022-05-15'),
      director: 'Jane Director',
      actors: ['Actor C', 'Actor D'],
    },
  ];

  const sampleTVShows = [
    {
      _id: '60c72b2f9b1d8b2a6c8f3e80',
      title: 'Drama Series',
      description: 'A gripping drama series.',
      genres: ['Drama'],
      episodes: [
        {
          episodeNumber: 1,
          seasonNumber: 1,
          releaseDate: new Date('2021-09-10'),
          director: 'Drama Director',
          actors: ['Actor E', 'Actor F'],
        },
        {
          episodeNumber: 2,
          seasonNumber: 1,
          releaseDate: new Date('2021-09-17'),
          director: 'Drama Director',
          actors: ['Actor E', 'Actor F'],
        },
      ],
    },
    {
      _id: '60c72b2f9b1d8b2a6c8f3e81',
      title: 'Fantasy Series',
      description: 'A magical journey.',
      genres: ['Fantasy'],
      episodes: [
        {
          episodeNumber: 1,
          seasonNumber: 1,
          releaseDate: new Date('2020-01-01'),
          director: 'Fantasy Director',
          actors: ['Actor G', 'Actor H'],
        },
        {
          episodeNumber: 2,
          seasonNumber: 1,
          releaseDate: new Date('2020-01-08'),
          director: 'Fantasy Director',
          actors: ['Actor G', 'Actor H'],
        },
      ],
    },
  ];

  await userModel.insertMany(sampleUsers);
  await movieModel.insertMany(sampleMovies);
  await tvShowModel.insertMany(sampleTVShows);

  console.log('Sample data inserted');
  await app.close();
}

bootstrap();
