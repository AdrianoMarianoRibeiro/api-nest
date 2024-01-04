import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  async create(category: Category): Promise<Category> {
    return await this.repository.save(category);
  }

  async update(category: Category): Promise<Category> {
    return await this.repository.save(category);
  }

  async delete(id: number): Promise<boolean> {
    const response = await this.repository.softDelete(id);
    if (!response.affected) {
      throw new Error('Categoria não encontrada');
    }
    return true;
  }

  async findById(id: number): Promise<Category> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }
}
