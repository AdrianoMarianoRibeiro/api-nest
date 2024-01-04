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
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ApiResponse } from '../shared/utils/api.response';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.service.create(createProductDto);
      return ApiResponse.success('Requisição realizada com sucesso', product);
    } catch (error) {
      if (error.status != 500) {
        return ApiResponse.warning('Atenção', error.message);
      }

      return ApiResponse.error('Erro', error.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await this.service.update(id, updateProductDto);
      return ApiResponse.success('Requisição realizada com sucesso', product);
    } catch (error) {
      if (error.status != 500) {
        console.log('status: ' + error.status);
        return ApiResponse.warning('Atenção', error.message);
      }

      console.log('status: ' + error.status);

      return ApiResponse.error('Erro', error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const product = await this.service.delete(id);
      return ApiResponse.success('Detalhes do produto', product);
    } catch (error) {
      if (error.status != 500) {
        return ApiResponse.warning('Atenção', error.message);
      }

      return ApiResponse.error('Erro', error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      const product = await this.service.findById(id);
      return ApiResponse.success('Detalhes do produto', product);
    } catch (error) {
      if (error.status != 500) {
        return ApiResponse.warning('Atenção', error.message);
      }

      return ApiResponse.error('Erro', error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const products = await this.service.findAll();
      return ApiResponse.success('Lista de produtos', products);
    } catch (error) {
      if (error.status != 500) {
        return ApiResponse.warning('Atenção', error.message);
      }

      return ApiResponse.error('Erro', error.message);
    }
  }
}
