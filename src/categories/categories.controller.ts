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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.handleRequest(
      () => this.categoriesService.create(createCategoryDto),
      'Category created successfully',
      'Failed to create category',
    );
  }

  @Get()
  async findAll() {
    return this.handleRequest(
      () => this.categoriesService.findAll(),
      'Categories retrieved successfully',
      'Failed to retrieve categories',
    );
  }

  @Get(':UUID')
  async findOne(@Param('UUID') UUID: string) {
    return this.handleRequest(
      () => this.categoriesService.findOne(UUID),
      'Category retrieved successfully',
      'Failed to retrieve category',
    );
  }

  @Patch(':UUID')
  async update(
    @Param('UUID') UUID: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.handleRequest(
      () => this.categoriesService.update(UUID, updateCategoryDto),
      'Category updated successfully',
      'Failed to update category',
    );
  }

  @Delete(':UUID')
  async remove(@Param('UUID') UUID: string) {
    return this.handleRequest(
      () => this.categoriesService.remove(UUID),
      'Category deleted successfully',
      'Failed to delete category',
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
