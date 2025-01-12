import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':UUID')
  findOne(@Param('UUID') UUID: string) {
    return this.authorsService.findOne(UUID);
  }

  @Patch(':UUID')
  update(
    @Param('UUID') UUID: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.update(UUID, updateAuthorDto);
  }

  @Delete(':UUID')
  remove(@Param('UUID') UUID: string) {
    return this.authorsService.remove(UUID);
  }
}
