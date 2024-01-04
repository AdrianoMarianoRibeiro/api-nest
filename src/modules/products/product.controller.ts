import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.service.create(createProductDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.service.update(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.service.delete(id);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
