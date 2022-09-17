import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
    constructor(private readonly topPageservice: TopPageService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreateTopPageDto) {
        return this.topPageservice.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string) {
        const page = await this.topPageservice.findById(id);

        if (!page) {
            throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
        }

        return page;
    }

    @Get('get-by-alias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const page = await this.topPageservice.findByAlias(alias);

        if (!page) {
            throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
        }

        return page;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    async patch(@Param('id') id: string, @Body() dto: TopPageModel) {
        const page = await this.topPageservice.update(id, dto);

        if (!page) {
            throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
        }

        return page;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
        const page = await this.topPageservice.delete(id);

        if (!page) {
            throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
        }
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() { firstCategory }: FindTopPageDto) {
        return this.topPageservice.findBycategory(firstCategory);
    }
}
