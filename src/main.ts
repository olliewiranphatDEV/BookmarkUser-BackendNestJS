import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// main.ts : the entry point of SERVER

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // craete app by AppModule function

  // GLOBAL PIPE : VALIDATE AND TRAANSFORN EVERY ROUTE
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strip not allowed field sliently
    forbidNonWhitelisted: true, // response 400, Throws error on unknown fields
    transform: true // transform as like the instance class in dto
  }))


  // ใช้ PORT จาก .env ถ้าไม่มีให้ fallback เป็น 3000
  const port = process.env.PORT ?? 3000
  await app.listen(port, () => console.log(`Server is running on port ${port}`)); // start SERVER at port: 300
}
bootstrap();
