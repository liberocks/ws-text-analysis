/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { ConfigSearch } from './es.config';
import { ESServiceInterface } from './es.type';

@Injectable()
export class ESService extends ElasticsearchService
  implements ESServiceInterface<any> {
  constructor() {
    super(ConfigSearch.searchConfig(process.env.ES_URL));
  }

  public async insertIndex(bulkData: any): Promise<any> {
    return this.bulk(bulkData)
      .then(res => res)
      .catch(err => {
        console.log(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async updateIndex(updateData: any): Promise<any> {
    return this.update(updateData)
      .then(res => res)
      .catch(err => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async searchIndex(searchData: any): Promise<any> {
    return this.search(searchData)
      .then(res => {
        return res.body.hits.hits;
      })
      .catch(err => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async deleteIndex(indexData: any): Promise<any> {
    return this.indices
      .delete(indexData)
      .then(res => res)
      .catch(err => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async deleteDocument(indexData: any): Promise<any> {
    return this.delete(indexData)
      .then(res => res)
      .catch(err => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
