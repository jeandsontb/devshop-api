import { Category } from 'src/modules/category/entity/category.entity';
import { ProductPublic } from '../dto/product';
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

    entityProduct.sku = input.sku;
    entityProduct.price = input.price;
    entityProduct.weight = input.weight;

    entityProduct.optionsNames = input.optionsNames;
    entityProduct.variations = [
      {
        optionName1: 'Vermelho',
        optionName2: 'V',
        sku: 'a',
        price: 10,
        weight: 0.5,
      },
      {
        optionName1: 'Azul',
        optionName2: 'A',
        sku: 'a',
        price: 10,
        weight: 0.5,
      },
    ];

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

  public static fromEntityToPublic(entity: Product): ProductPublic {
    const product = new ProductPublic();
    product.id = entity.id;
    product.name = entity.name;
    product.slug = entity.slug;
    product.description = entity.description;
    product.category = entity.category.toString();

    return product;
  }
}
