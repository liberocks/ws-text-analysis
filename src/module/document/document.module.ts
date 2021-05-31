import { Module } from '@nestjs/common';
import { ESService } from '../es/es.service';

import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [],
  controllers: [DocumentController],
  providers: [
    DocumentService,
    {
      provide: 'ESService',
      useClass: ESService,
    },
  ],
})
export class DocumentModule {}
