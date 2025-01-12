import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':UUID')
  findOne(@Param('UUID') UUID: string) {
    return this.booksService.findOne(UUID);
  }

  @Patch(':UUID')
  update(@Param('UUID') UUID: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(UUID, updateBookDto);
  }

  @Delete(':UUID')
  remove(@Param('UUID') UUID: string) {
    return this.booksService.remove(UUID);
  }
}
