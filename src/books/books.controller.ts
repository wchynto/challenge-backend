import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.handleRequest(
      () => this.booksService.create(createBookDto),
      'Book created successfully',
      'Failed to create book',
    );
  }

  @Get()
  async findAll() {
    return this.handleRequest(
      () => this.booksService.findAll(),
      'Books retrieved successfully',
      'Failed to retrieve books',
    );
  }

  @Get(':UUID')
  async findOne(@Param('UUID') UUID: string) {
    return this.handleRequest(
      () => this.booksService.findOne(UUID),
      'Book retrieved successfully',
      'Failed to retrieve book',
    );
  }

  @Patch(':UUID')
  async update(
    @Param('UUID') UUID: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.handleRequest(
      () => this.booksService.update(UUID, updateBookDto),
      'Book updated successfully',
      'Failed to update book',
    );
  }

  @Delete(':UUID')
  async remove(@Param('UUID') UUID: string) {
    return this.handleRequest(
      () => this.booksService.remove(UUID),
      'Book deleted successfully',
      'Failed to delete book',
    );
  }

  private async handleRequest(
    serviceMethod: () => Promise<any>,
    successMessage: string,
    errorMessage: string,
  ) {
    try {
      const data = await serviceMethod();
      return {
        success: true,
        message: successMessage,
        data,
      };
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          success: false,
          message: errorMessage,
          error: error.message,
        },
        status,
      );
    }
  }
}
