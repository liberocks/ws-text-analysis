/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { ConfigSearch } from './es.config';

@Injectable()
export class ESService extends ElasticsearchService {
  constructor() {
    super(ConfigSearch.searchConfig(process.env.ES_URL));
  }

  async onApplicationBootstrap() {
    try {
      await this.ping();
      Logger.log('Connected to Elasticsearch', 'ESService');
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  }

  public async createIndex(index: string, body: Record<string, string> = {}) {
    return this.indices
      .create({ index, body })
      .then(res => res)
      .catch(err => {
        Logger.error(err, 'ESService');
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async deleteIndex(index: string) {
    return this.indices
      .delete({ index })
      .then(res => res)
      .catch(err => {
        Logger.error(err, 'ESService');
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async insertDocuments(bulkData: any): Promise<any> {
    return this.bulk(bulkData)
      .then(res => res)
      .catch(err => {
        Logger.error(err, 'ESService');
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async updateDocuments(updateData: any): Promise<any> {
    return this.update(updateData)
      .then(res => res)
      .catch(err => {
        Logger.error(err, 'ESService');
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async searchDocuments(searchData: any): Promise<any> {
    return this.search(searchData)
      .then(res => {
        return res.body.hits.hits;
      })
      .catch(err => {
        Logger.error(err, 'ESService');
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async deleteDocuments(indexData: any): Promise<any> {
    return this.indices
      .delete(indexData)
      .then(res => res)
      .catch(err => {
        Logger.error(err, 'ESService');
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
