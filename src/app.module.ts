import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { featureModules } from './modules';
import { Category } from './modules/categories/category.entity';
import { Product } from './modules/products/product.entity';

const defaultOptions: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db/sql',
  synchronize: true,
  entities: [Category, Product],
};

@Module({
  imports: [...featureModules, TypeOrmModule.forRoot(defaultOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
