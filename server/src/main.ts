import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  ImATeapotException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import LoggingInterceptor from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const enableCORS = app.get(ConfigService).get<string>('NODE_ENV') === 'prod';
  const whiteList = ['http://localhost:5173', 'http://localhost:4173'];
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (enableCORS && whiteList.includes(origin)) {
        callback(null, true);
      } else if (!enableCORS) {
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        callback(new ImATeapotException('Not allowed by CORS'), false);
      }
    },
  });
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
  );
  const options = new DocumentBuilder().setTitle('Trains').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(config.get<number>('PORT'), () => {
    console.log(`Server: http://localhost:${config.get<number>('PORT')}`);
    console.log(
      `Documentation: http://localhost:${config.get<number>('PORT')}/api-docs`,
    );
  });
}
bootstrap();
