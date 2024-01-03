import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { featureModules } from './modules';
import { Category } from './modules/categories/category.entity';

const defaultOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'senha',
  database: 'database',
  synchronize: false,
  host: '127.0.0.1',
  entities: [Category],
};

@Module({
  imports: [...featureModules, TypeOrmModule.forRoot(defaultOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
