import { Module } from '@nestjs/common';

import { ESService } from './es.service';

@Module({
  imports: [],
  providers: [
    {
      provide: 'ESService',
      useClass: ESService,
    },
  ],
  exports: [ESModule],
})
export class ESModule {}
