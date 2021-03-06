import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', '/public/upload'), {
    prefix: '/static/image/',
  });
  app.useStaticAssets(join(__dirname, '..', '/public/message'), {
    prefix: '/static/image/',
  });
  app.useStaticAssets(join(__dirname, '..', '/public/sound'), {
    prefix: '/static/sound/',
  });

  //跨域
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('接口')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    console.log('文档：http://localhost:3000/api');

  });
}
bootstrap();
