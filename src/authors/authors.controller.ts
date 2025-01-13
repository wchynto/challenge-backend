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
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.handleRequest(
      () => this.authorsService.create(createAuthorDto),
      'Author created successfully',
      'Failed to create author',
    );
  }

  @Get()
  async findAll() {
    return this.handleRequest(
      () => this.authorsService.findAll(),
      'Authors retrieved successfully',
      'Failed to retrieve authors',
    );
  }

  @Get(':UUID')
  async findOne(@Param('UUID') UUID: string) {
    return this.handleRequest(
      () => this.authorsService.findOne(UUID),
      'Author retrieved successfully',
      'Failed to retrieve author',
    );
  }

  @Patch(':UUID')
  async update(
    @Param('UUID') UUID: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.handleRequest(
      () => this.authorsService.update(UUID, updateAuthorDto),
      'Author updated successfully',
      'Failed to update author',
    );
  }

  @Delete(':UUID')
  async remove(@Param('UUID') UUID: string) {
    return this.handleRequest(
      () => this.authorsService.remove(UUID),
      'Author deleted successfully',
      'Failed to delete author',
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
