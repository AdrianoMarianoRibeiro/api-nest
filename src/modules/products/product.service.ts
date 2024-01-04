import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = plainToInstance(Product, createProductDto);
    return await this.repository.create(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findById(id);

    if (!product) {
      throw new Error('Categoria não encontrada');
    }

    // Atualiza apenas os campos fornecidos no DTO
    if (updateProductDto.name !== undefined) {
      product.name = updateProductDto.name;
    }

    return await this.repository.update(product);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async findById(id: number): Promise<any> {
    const product = await this.repository.findById(id);
    return {
      id: product.id,
      name: product.name,
      products: product.category,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    };
  }

  async findAll(): Promise<any> {
    return await this.repository.findAll();
  }
}
