import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'src/utils/s3';
import { Repository } from 'typeorm';
import { Brand } from './entity/brand.entity';
import * as fs from 'fs';

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
  ): Promise<Brand> {
    const stream = createReadStream();

    const dataFile = {
      filename,
      stream,
      mimetype,
      bucket: 'devshop-project',
      destinationFileName: id + '-' + filename,
    };

    await this.s3.upload(dataFile);
    return null;
    // return this.brandRepository.save(input);
  }
}
