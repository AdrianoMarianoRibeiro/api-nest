import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { plainToClass } from 'class-transformer';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = plainToClass(Category, createCategoryDto);
    return await this.categoryRepository.create(category);
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

    return await this.categoryRepository.update(category);
  }

  async findById(id: number): Promise<Category> {
    return await this.categoryRepository.findById(id);
  }
}
