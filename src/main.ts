import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port,'localhost');
  console.log(`Application is running on Port: ${await app.getUrl()}`);
}
bootstrap();
