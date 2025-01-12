import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './shared/services/database-connection.service';
import { CategoriesModule } from './categories/categories.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    BooksModule,
    CategoriesModule,
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
