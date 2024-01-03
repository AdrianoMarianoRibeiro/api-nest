import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  async update(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  async findById(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { id } });
  }
}
