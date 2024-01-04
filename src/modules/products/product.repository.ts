import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CategoryRepository } from '../categories/category.repository';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,

    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findById(
      createProductDto.category,
    );

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const product = this.repository.create({
      name: createProductDto.name,
      category: { id: category.id },
    });

    return await this.repository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const category = await this.categoryRepository.findById(
      updateProductDto.category,
    );

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const product = await this.findById(id);

    Object.assign(product, updateProductDto);

    return await this.repository.save(product);
  }

  async delete(id: number): Promise<boolean> {
    const response = await this.repository.softDelete(id);

    if (!response.affected) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return true;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`product with ID ${id} not found`);
    }
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find({ relations: ['category'] });
  }
}
