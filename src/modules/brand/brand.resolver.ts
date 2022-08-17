import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { BrandPublic } from './dto/brand';
import { BrandCreateInput } from './dto/brand-create.input';
import { BrandUpdateInput } from './dto/brand-update.input';
import { BrandMapper } from './mapper/brand.mapper';

@Resolver((of) => BrandPublic)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query((returns) => [BrandPublic], { name: 'getAllBrands' })
  async getAllBrands(): Promise<BrandPublic[]> {
    return this.brandService.findAll();
  }

  @Query((returns) => BrandPublic, { name: 'getBrandById' })
  async getBrandById(@Args('id') id: string): Promise<BrandPublic> {
    return this.brandService.findById(id);
  }

  @Query((returns) => BrandPublic, { name: 'getBrandBySlug' })
  async getBrandBySlug(@Args('slug') slug: string): Promise<BrandPublic> {
    return this.brandService.findBySlug(slug);
  }

  @Mutation((returns) => BrandPublic, { name: 'uploadBrandLogo' })
  async uploadLogo(@Args('input') input: string): Promise<BrandPublic> {
    return this.brandService.uploadLogo(input);
  }

  @Mutation((returns) => BrandPublic, { name: 'brandCreateInput' })
  async createBrand(
    @Args('input') input: BrandCreateInput,
  ): Promise<BrandPublic> {
    return this.brandService.create(BrandMapper.toEntity(input));
  }

  @Mutation((returns) => BrandPublic, { name: 'updateBrand' })
  async updateBrand(
    @Args('input') input: BrandUpdateInput,
  ): Promise<BrandPublic> {
    return this.brandService.update(input);
  }

  @Mutation((returns) => Boolean, { name: 'deleteBrand' })
  async deleteBrand(@Args('id') input: string): Promise<boolean> {
    return this.brandService.delete(input);
  }
}
