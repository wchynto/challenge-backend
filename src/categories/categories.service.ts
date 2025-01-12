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

  create(createCategoryDto: CreateCategoryDto) {
    const category: Category = new Category();
    category.name = createCategoryDto.name;
    category.description = createCategoryDto.description;
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(UUID: string) {
    return this.categoryRepository.findOneByOrFail({ UUID });
  }

  update(UUID: string, updateCategoryDto: UpdateCategoryDto) {
    const category: Category = new Category();
    category.name = updateCategoryDto.name;
    category.description = updateCategoryDto.description;
    return this.categoryRepository.update({ UUID }, category);
  }

  remove(UUID: string) {
    return this.categoryRepository.delete({ UUID });
  }
}
