import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':UUID')
  findOne(@Param('UUID') UUID: string) {
    return this.categoriesService.findOne(UUID);
  }

  @Patch(':UUID')
  update(
    @Param('UUID') UUID: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(UUID, updateCategoryDto);
  }

  @Delete(':UUID')
  remove(@Param('UUID') UUID: string) {
    return this.categoriesService.remove(UUID);
  }
}
