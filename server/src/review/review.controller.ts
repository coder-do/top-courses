import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';
import { UserEmail } from '../decorators/user-email.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TelegramService } from '../telegram/telegram.service';

@Controller('review')
export class ReviewController {
    constructor(
        private readonly reviewService: ReviewService,
        private readonly tgService: TelegramService
    ) { }

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(
        @Body() dto: CreateReviewDto,
    ): Promise<DocumentType<ReviewModel, BeAnObject>> {
        await this.notify(dto);
        return this.reviewService.create(dto);
    }

    @UsePipes(new ValidationPipe())
    @Post('notify')
    async notify(
        @Body() dto: CreateReviewDto,
    ) {
        const message = `Добавлен новый отзыв!\n`
            + `Имя: ${dto.name}\n`
            + `Заголовок: ${dto.title}\n`
            + `Описание: ${dto.description}\n`
            + `Рейтинг: ${dto.rating}\n`
            + `ID Продукта: ${dto.productId}`;
        return this.tgService.sendMessage(message);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deleted = await this.reviewService.delete(id);
        if (!deleted) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Get('getByProduct/:productId')
    async getByProduct(
        @Param('productId', IdValidationPipe) productId: string,
        @UserEmail() email: string,
    ) {
        return this.reviewService.findProductById(productId);
    }
}
