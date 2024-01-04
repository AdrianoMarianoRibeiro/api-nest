import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async update(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async delete(id: number): Promise<boolean> {
    const response = await this.repository.softDelete(id);
    if (!response.affected) {
      throw new Error('Categoria não encontrada');
    }
    return true;
  }

  async findById(id: number): Promise<Product> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }
}
