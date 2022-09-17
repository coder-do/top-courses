import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';

const prodId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
    name: 'Test review',
    description: 'dddd',
    title: 'title',
    rating: 5,
    productId: prodId,
};

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;
    let accessToken: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const { body } = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                login: 'mkiloyan@mail.ru',
                password: 'mkiloyan',
            } as AuthDto);

        accessToken = body.access_token;
    });

    afterAll(async () => {
        disconnect();
    });

    it('/review/create - POST -> SUCCESS', async () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                createdId = body._id;
                expect(createdId).toBeDefined();
            });
    });

    it('/review/create - POST -> FAIL', async () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send({ ...testDto, rating: 7 })
            .expect(400, {
                statusCode: 400,
                message: ['rating must not be greater than 5'],
                error: 'Bad Request',
            });
    });

    it('/review/findById - GET -> SUCCESS', async () => {
        return request(app.getHttpServer())
            .get('/review/getByProduct/' + prodId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(1);
            });
    });

    it('/review/findById - GET -> FAIL', async () => {
        return request(app.getHttpServer())
            .get('/review/getByProduct/' + new Types.ObjectId().toHexString())
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(0);
            });
    });

    it('/review/delete - DELETE -> FAIL', async () => {
        return request(app.getHttpServer())
            .delete('/review/delete/' + new Types.ObjectId().toHexString())
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404, {
                statusCode: 404,
                message: REVIEW_NOT_FOUND,
            });
    });

    it('/review/delete - DELETE -> SUCCESS', async () => {
        return request(app.getHttpServer())
            .delete('/review/delete/' + createdId)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200);
    });
});
