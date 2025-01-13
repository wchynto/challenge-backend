import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category: Category = new Category();
    category.name = createCategoryDto.name;
    category.description = createCategoryDto.description;
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(UUID: string) {
    return await this.categoryRepository.findOneByOrFail({ UUID });
  }

  async update(UUID: string, updateCategoryDto: UpdateCategoryDto) {
    const category: Category = new Category();
    category.name = updateCategoryDto.name;
    category.description = updateCategoryDto.description;
    return await this.categoryRepository.update({ UUID }, category);
  }

  async remove(UUID: string) {
    return await this.categoryRepository.delete({ UUID });
  }
}
