import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { ConfigService } from './module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port, '0.0.0.0', () => {
    Logger.log(`Listening on PORT ${port}`, 'NestApplication');
  });
}
bootstrap();
