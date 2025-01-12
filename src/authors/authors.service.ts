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

  create(createAuthorDto: CreateAuthorDto) {
    const author: Author = new Author();
    author.name = createAuthorDto.name;
    author.bio = createAuthorDto.bio;
    return this.authorRepository.save(author);
  }

  findAll() {
    return this.authorRepository.find();
  }

  findOne(UUID: string) {
    return this.authorRepository.findOneByOrFail({ UUID });
  }

  update(UUID: string, updateAuthorDto: UpdateAuthorDto) {
    const author: Author = new Author();
    author.name = updateAuthorDto.name;
    author.bio = updateAuthorDto.bio;
    return this.authorRepository.update({ UUID }, author);
  }

  remove(UUID: string) {
    return this.authorRepository.delete({ UUID });
  }
}
