import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CategoryService {
  constructor(private repository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = plainToClass(Category, createCategoryDto);
    return await this.repository.create(category);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findById(id);

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    // Atualiza apenas os campos fornecidos no DTO
    if (updateCategoryDto.description !== undefined) {
      category.description = updateCategoryDto.description;
    }

    return await this.repository.update(category);
  }

  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async findById(id: number): Promise<any> {
    const category = await this.repository.findById(id);
    return {
      id: category.id,
      description: category.description,
      products: category.products,
      created_at: category.createdAt,
      updated_at: category.updatedAt,
    };
  }

  async findAll(): Promise<any> {
    return await this.repository.findAll();
  }
}
