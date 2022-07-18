import { Injectable } from '@nestjs/common';
import { Category } from './dto/category';

@Injectable()
export class CategoryService {
  async findAll(): Promise<Category[]> {
    return [{ id: '1', name: 'eee' }];
  }
}
