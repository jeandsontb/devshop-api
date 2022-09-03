import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import * as sharp from 'sharp';
import { S3 } from 'src/utils/s3';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private s3: S3,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      loadRelationIds: true,
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<Product> {
    return this.productRepository.findOne(id, { loadRelationIds: true });
  }

  async findBySlug(slug: string): Promise<Product> {
    return this.productRepository.findOne({
      where: [{ slug }],
      loadRelationIds: true,
    });
  }

  async create(input: Product): Promise<Product> {
    return this.productRepository.save(input);
  }

  async update(input: Product): Promise<Product> {
    await this.productRepository.update(input.id, {
      name: input.name,
      slug: input.slug,
      description: input.description,
      category: input.category,
    });
    return input;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.productRepository.delete(id);
      return true;
    } catch (err) {
      return false;
    }
  }

  async uploadImage(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string,
  ): Promise<boolean> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      return false;
    }

    if (!product.images) {
      product.images = [];
    }

    const stream = createReadStream().pipe(sharp().resize(300));

    const dataFile = {
      stream,
      mimetype,
      bucket: 'devshop-project',
      destinationFileName: id + '-' + filename,
    };

    const url = await this.s3.upload(dataFile);
    product.images.push(url);

    await this.productRepository.update(id, {
      images: product.images,
    });
    return true;
  }

  async deleteImage(id: string, url: string): Promise<boolean> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      return false;
    }

    if (!product.images) {
      product.images = [];
    }

    const fileNameParts = url.split('/');
    const filename = fileNameParts[fileNameParts.length - 1];

    await this.s3.deleteObject('devshop-project', filename);

    product.images.push(url);
    product.images = product.images.filter((image) => image !== url);

    await this.productRepository.update(id, {
      images: product.images,
    });
    return true;
  }
}
