import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'src/utils/s3';
import { Repository } from 'typeorm';
import { Brand } from './entity/brand.entity';
import * as sharp from 'sharp';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private s3: S3,
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find({ order: { id: 'DESC' } });
  }

  async findById(id: string): Promise<Brand> {
    return this.brandRepository.findOne({ where: { id } });
  }

  async findBySlug(slug: string): Promise<Brand> {
    return this.brandRepository.findOne({ where: [{ slug }] });
  }

  async create(input: Brand): Promise<Brand> {
    return this.brandRepository.save(input);
  }

  async update(input: Brand): Promise<Brand> {
    await this.brandRepository.update(input.id, {
      name: input.name,
      slug: input.slug,
    });
    return input;
  }

  async delete(id: string): Promise<boolean> {
    try {
      const brand = await this.brandRepository.findOne({ where: { id } });
      if (!brand) {
        return false;
      }

      if (brand && brand.logo) {
        const filename = brand.logo.split('.com/')[1];
        await this.s3.deleteObject('devshop-project', filename);
      }

      await this.brandRepository.delete(id);
      return true;
    } catch (err) {
      return false;
    }
  }

  async uploadLogo(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string,
  ): Promise<boolean> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      return false;
    }

    if (brand && brand.logo) {
      const filename = brand.logo.split('.com/')[1];
      await this.s3.deleteObject('devshop-project', filename);
    }

    const stream = createReadStream().pipe(sharp().resize(300));

    const dataFile = {
      stream,
      mimetype,
      bucket: 'devshop-project',
      destinationFileName: id + '-' + filename,
    };

    const url = await this.s3.upload(dataFile);
    await this.brandRepository.update(id, {
      logo: url,
    });
    return true;
  }

  async removeBrandLogo(id: string): Promise<boolean> {
    const brand = await this.brandRepository.findOne({ where: { id } });

    const filename = brand.logo.split('.com/')[1];
    await this.s3.deleteObject('devshop-project', filename);

    await this.brandRepository.update(brand.id, {
      logo: null,
    });
    return true;
  }
}
