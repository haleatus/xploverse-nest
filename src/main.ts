import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the ConfigService instance
  const configService = app.get(ConfigService);

  // Retrieve the PORT from ConfigService (defaults to 3000 if not set)
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`Server is running on port http://localhost:${port}`);
}
bootstrap();
