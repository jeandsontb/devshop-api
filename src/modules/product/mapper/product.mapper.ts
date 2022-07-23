import { Category } from 'src/modules/category/entity/category.entity';
import { ProductCreateInput } from '../dto/product-create.input';
import { ProductUpdateInput } from '../dto/product-update.input';
import { Product } from '../entity/product.entity';

export class ProductMapper {
  public static toEntity(input: ProductCreateInput): Product {
    const entityProduct = new Product();
    entityProduct.name = input.name;
    entityProduct.slug = input.slug;
    entityProduct.description = input.description;

    const category = new Category();
    category.id = input.category;
    entityProduct.category = category;

    return entityProduct;
  }

  public static fromUpdateToEntity(input: ProductUpdateInput): Product {
    const entityProduct = new Product();
    entityProduct.id = input.id;
    entityProduct.name = input.name;
    entityProduct.slug = input.slug;
    entityProduct.description = input.description;

    const category = new Category();
    category.id = input.category;
    entityProduct.category = category;

    return entityProduct;
  }
}
