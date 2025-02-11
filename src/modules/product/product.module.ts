import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSlugIsUnique } from './custom-validators/productSlugIsUnique';
import { Product } from './entity/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { S3 } from '../../utils/s3';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductResolver, ProductSlugIsUnique, S3],
})
export class ProductModule {}
