import { Module } from '@nestjs/common';

import { ConfigModule, ESModule, ProductModule } from './module';

@Module({
  imports: [ConfigModule, ProductModule, ESModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
