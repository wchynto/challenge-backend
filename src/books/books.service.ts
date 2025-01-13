import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const categories: Array<Category> = await Promise.all(
      createBookDto.categories.map(async (categoryUUID) => {
        const category = await this.categoryRepository.findOneByOrFail({
          UUID: categoryUUID.toString(),
        });
        return category;
      }),
    );

    const book: Book = new Book();
    book.title = createBookDto.title;
    book.description = createBookDto.description;
    book.publishedYear = createBookDto.publishedYear;
    book.price = createBookDto.price;
    book.categories = categories;
    book.authors = createBookDto.authors;
    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(UUID: string) {
    return await this.bookRepository.findOneByOrFail({ UUID });
  }

  async update(UUID: string, updateBookDto: UpdateBookDto) {
    let categories: Array<Category>;
    if (updateBookDto.categories) {
      categories = await Promise.all(
        updateBookDto.categories.map(async (categoryUUID) => {
          const category = await this.categoryRepository.findOneByOrFail({
            UUID: categoryUUID.toString(),
          });
          return category;
        }),
      );
    }

    const book: Book = new Book();
    book.title = updateBookDto.title;
    book.description = updateBookDto.description;
    book.publishedYear = updateBookDto.publishedYear;
    book.price = updateBookDto.price;
    book.categories = categories;
    book.authors = updateBookDto.authors;
    return await this.bookRepository.update(UUID, book);
  }

  async remove(UUID: string) {
    return await this.bookRepository.delete(UUID);
  }
}
