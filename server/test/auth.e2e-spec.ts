import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AppModule } from './../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
    login: 'mkiloyan@mail.ru',
    password: 'mkiloyan'
};

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined();
            });
    });

    it('/auth/login (POST) - fail password', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: '2' })
            .expect(401, {
                statusCode: 401,
                message: "Пароль пользователя не верный!",
                error: "Unauthorized"
            });
    });

    it('/auth/login (POST) - fail password', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, login: 'aaa@a.ru' })
            .expect(401, {
                statusCode: 401,
                message: "Пользователь не найден!",
                error: "Unauthorized"
            });
    });

    afterAll(() => {
        disconnect();
    });
});