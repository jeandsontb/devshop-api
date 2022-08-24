import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 250, nullable: false })
  name: string;

  @Column({ length: 450, nullable: false })
  email: string;

  @Column({ length: 450, nullable: false })
  password: string;

  @Column({ length: 450, nullable: false })
  role: string;

  @Column({ type: 'timestamp' })
  lastLogin: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
