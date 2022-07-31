import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandResolver } from './brand.resolver';
import { BrandService } from './brand.service';
import { BrandSlugIsUnique } from './custom-validators/brandSlugIsUnique';
import { Brand } from './entity/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandService, BrandResolver, BrandSlugIsUnique],
})
export class BrandModule {}
