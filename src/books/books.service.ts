import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
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
    return this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(UUID: string) {
    return this.bookRepository.findOneByOrFail({ UUID });
  }

  async update(UUID: string, updateBookDto: UpdateBookDto) {
    const categories: Array<Category> = await Promise.all(
      updateBookDto.categories.map(async (categoryUUID) => {
        const category = await this.categoryRepository.findOneByOrFail({
          UUID: categoryUUID.toString(),
        });
        return category;
      }),
    );

    const book: Book = new Book();
    book.title = updateBookDto.title;
    book.description = updateBookDto.description;
    book.publishedYear = updateBookDto.publishedYear;
    book.price = updateBookDto.price;
    book.categories = categories;
    book.authors = updateBookDto.authors;
    return this.bookRepository.update(UUID, book);
  }

  remove(UUID: string) {
    return this.bookRepository.delete(UUID);
  }
}
