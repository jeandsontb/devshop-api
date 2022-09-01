import { BrandPublic } from '../dto/brand';
import { BrandCreateInput } from '../dto/brand-create.input';
import { BrandUpdateInput } from '../dto/brand-update.input';
import { Brand } from '../entity/brand.entity';

export class BrandMapper {
  public static toEntity(input: BrandCreateInput): Brand {
    const brandEntity = new Brand();
    brandEntity.name = input.name;
    brandEntity.slug = input.slug;
    return brandEntity;
  }
  public static fromUpdateToEntity(input: BrandUpdateInput): Brand {
    const brandEntity = new Brand();
    brandEntity.id = input.id;
    brandEntity.name = input.name;
    brandEntity.slug = input.slug;
    return brandEntity;
  }
  public static fromEntityToPublic(entity: Brand): BrandPublic {
    const brandPublic = new BrandPublic();
    brandPublic.id = entity.id;
    brandPublic.name = entity.name;
    brandPublic.slug = entity.slug;
    return brandPublic;
  }
}
