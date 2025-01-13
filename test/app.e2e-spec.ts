import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdUserUUID: string = '';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('sign up', () => {
    it('Should create user and return a token', async () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name: 'Dolor',
          email: 'dolor@gmail.com',
          password: 'dolor512',
        })
        .expect(201)
        .then((response) => {
          createdUserUUID = response.body.user.UUID;
          expect(response.body).toHaveProperty('token');
        });
    });
  });

  describe('sign in', () => {
    it('Should sign in with email and password and return a token', async () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: 'dolor@gmail.com',
          password: 'dolor512',
        })
        .expect(201)
        .then((response) => {
          createdUserUUID = response.body.user.UUID;
          expect(response.body).toHaveProperty('token');
        });
    });
  });

  afterAll(async () => {
    await request(app.getHttpServer())
      .delete('/users/' + createdUserUUID)
      .send()
      .expect(200);
    await app.close();
  });
});
