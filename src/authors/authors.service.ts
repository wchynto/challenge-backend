import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author: Author = new Author();
    author.name = createAuthorDto.name;
    author.bio = createAuthorDto.bio;
    return await this.authorRepository.save(author);
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(UUID: string) {
    return await this.authorRepository.findOneByOrFail({ UUID });
  }

  async update(UUID: string, updateAuthorDto: UpdateAuthorDto) {
    const author: Author = new Author();
    author.name = updateAuthorDto.name;
    author.bio = updateAuthorDto.bio;
    return await this.authorRepository.update({ UUID }, author);
  }

  async remove(UUID: string) {
    return await this.authorRepository.delete({ UUID });
  }
}
