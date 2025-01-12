import { Author } from 'src/authors/entities/author.entity';
import { Category } from '../../categories/entities/category.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  UUID: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  publishedYear: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany((type) => Category, (category) => category.books)
  @JoinTable()
  categories: Category[];

  @ManyToMany((type)=> Author, (author) => author.books, {
    cascade: ['insert'],
  })
  @JoinTable()
  authors: Author[];
}
