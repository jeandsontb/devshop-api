import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entity/category.entity';

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
}
