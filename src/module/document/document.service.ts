import { Injectable, Inject } from '@nestjs/common';
import { plural } from 'pluralize';
import { ESService } from '../es/es.service';

@Injectable()
export class DocumentService {
  constructor(
    @Inject('ESService')
    private readonly esService: ESService,
  ) {}

  private toDocumentIndex(index: string) {
    return {
      _index: index,
      _type: plural(index),
    };
  }

  private toBulkDocument<T = any>(index: string, document: T) {
    const bulk: (T | { index: { _index: string; _type: string } })[] = [];

    const documentIndex = this.toDocumentIndex(index);

    bulk.push({ index: documentIndex });
    bulk.push(document);

    return {
      body: bulk,
      index: documentIndex._index,
      type: documentIndex._type,
    };
  }

  public async createIndex(index: string, properties: any) {
    return this.esService.createIndex(index, properties);
  }

  public async deleteIndex(index: string) {
    return this.esService.deleteIndex(index);
  }
}
