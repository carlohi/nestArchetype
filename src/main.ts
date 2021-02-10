import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions:{
        enableImplicitConversion:true
      }
    })
  );


  const options = new DocumentBuilder()
  .setTitle('cats')
  .setDescription('Cats application')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);  

  await app.listen(3000);
  const logger = new Logger();
  logger.log(`Server is listening in ${await app.getUrl()}`);
}
bootstrap();
