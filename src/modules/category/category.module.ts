import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CategorySlugIsUnique } from './custom-validators/categorySlugIsUnique';
import { Category } from './entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver, CategorySlugIsUnique],
})
export class CategoryModule {}
