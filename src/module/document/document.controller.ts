import {
  Controller,
  Get,
  Query,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('index')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get(':index')
  public async getDocuments(
    @Query() query: Record<string, string>,
  ): Promise<any> {
    return { ...query };
  }

  @Post(':index')
  public async createIndex(
    @Param('index') index: string,
    @Body() body: Record<string, string>,
  ): Promise<any> {
    return this.documentService.createIndex(index, body);
  }

  @Delete(':index')
  public async deleteIndex(@Param('index') index: string): Promise<any> {
    return this.documentService.deleteIndex(index);
  }

  @Put(':index')
  public async addDocument(
    @Query() query: Record<string, string>,
  ): Promise<any> {
    return { ...query };
  }

  @Put(':index/:document_id')
  public async putDocument(
    @Query() query: Record<string, string>,
  ): Promise<any> {
    return { ...query };
  }

  @Delete(':index/:document_id')
  public async deleteDocument(
    @Query() query: Record<string, string>,
  ): Promise<any> {
    return { ...query };
  }
}
