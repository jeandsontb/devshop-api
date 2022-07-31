import { BrandCreateInput } from '../dto/brand-create.input';
import { Brand } from '../entity/brand.entity';

export class BrandMapper {
  public static toEntity(input: BrandCreateInput): Brand {
    const brandEntity = new Brand();
    brandEntity.name = input.name;
    brandEntity.slug = input.slug;
    return brandEntity;
  }
}
