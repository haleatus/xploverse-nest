import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Retrieve the PORT from ConfigService (defaults to 3000 if not set)
  const port = process.env.PORT || 3000;

  // prefix
  app.setGlobalPrefix('api');

  // -- Cors setup
  app.enableCors({
    origin: [
      '*',
      'http://localhost:3001',
      'https://xploverse-webapp.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
  console.log(`Server is running on port http://localhost:${port}`);
}
bootstrap();
