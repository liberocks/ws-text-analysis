import { Module } from '@nestjs/common';

import { ConfigModule, ESModule, DocumentModule } from './module';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule, DocumentModule, ESModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
