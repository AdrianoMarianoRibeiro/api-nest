import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // const product = plainToInstance(Product, createProductDto);
    return await this.repository.create(createProductDto);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.repository.update(id, updateProductDto);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async findById(id: number): Promise<any> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error('Categoria não encontrada');
    }
    return product;
  }

  async findAll(): Promise<any> {
    return await this.repository.findAll();
  }
}
