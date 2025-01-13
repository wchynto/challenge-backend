import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const user: User = new User();
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(UUID: string) {
    return this.userRepository.findOneByOrFail({ UUID });
  }

  async update(UUID: string, updateUserDto: UpdateUserDto) {
    const { name, email, password } = updateUserDto;

    const user = new User();
    user.name = name;
    user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    return this.userRepository.update(UUID, user);
  }

  remove(UUID: string) {
    return this.userRepository.delete(UUID);
  }
}
