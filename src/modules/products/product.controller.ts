import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('user')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }
}
