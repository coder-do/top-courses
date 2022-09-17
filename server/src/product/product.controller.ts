import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    NotFoundException,
    UsePipes,
    ValidationPipe,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { PRODUCT_NOT_FOUND } from './product.constants';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const product = await this.productService.findById(id);

        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND);
        }

        return product;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    async patch(
        @Param('id', IdValidationPipe) id: string,
        @Body() dto: ProductModel,
    ) {
        const product = await this.productService.update(id, dto);

        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND);
        }

        return product;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async delete(
        @Param('id', IdValidationPipe) id: string,
    ): Promise<void> | never {
        const product = await this.productService.delete(id);

        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND);
        }
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto) {
        return this.productService.findWithReviews(dto);
    }
}
