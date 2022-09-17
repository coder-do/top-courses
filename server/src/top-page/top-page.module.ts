import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageController } from './top-page.controller';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
    controllers: [TopPageController],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: TopPageModel,
                schemaOptions: {
                    collection: 'top-page',
                },
            },
        ]),
    ],
    providers: [TopPageService],
})
export class TopPageModule {}
