import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  publishedYear: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsNotEmpty()
  categories: Category[];

  @IsArray()
  authors: Author[];
}
