import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Retrieve the PORT from ConfigService (defaults to 3000 if not set)
  const port = 3000;

  await app.listen(port);
  console.log(`Server is running on port http://localhost:${port}`);
}
bootstrap();
