import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entity/category.entity';

interface ProductVariation {
  optionName1: string;
  optionName2: string;
  sku: string;
  price: number;
  weight: number;
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 250, nullable: false })
  name: string;

  @Column({ length: 1000, nullable: false })
  description: string;

  @Column({ length: 250, nullable: false })
  slug: string;

  // Product N -> 1 Category
  @ManyToOne((type) => Category, (category) => category.id)
  category: Category;

  @Column({ type: 'jsonb', nullable: true })
  optionsNames: string[];

  @Column({ type: 'jsonb', nullable: true })
  variations: ProductVariation[];

  @Column({ length: 250, nullable: true })
  sku: string;

  @Column({ nullable: true, type: 'money' })
  price: number;

  @Column({ nullable: true, type: 'decimal' })
  weight: number;

  @Column({ type: 'jsonb', nullable: true })
  images: string[];
}
