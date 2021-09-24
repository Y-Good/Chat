import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', '/public/upload'), {
    prefix: '/static/',
  });
  app.enableCors();
  // app.useWebSocketAdapter(new WsAdapter(app));
  
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
