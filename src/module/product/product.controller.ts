import { Controller, Get, Query } from '@nestjs/common';

@Controller('products')
export class ProductController {
  @Get()
  public async getProducts(
    @Query() query: Record<string, string>,
  ): Promise<any> {
    return { ...query };
  }
}
