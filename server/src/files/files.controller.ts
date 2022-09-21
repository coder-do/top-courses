import { Controller, HttpCode, Inject, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '..//auth/guards/jwt.guard';
import { FileResponseDto } from './dto/file-response.dto';
import { FilesService } from './files.service';
import { MFile } from './mFile.class';

@Controller('files')
export class FilesController {

    constructor(private readonly fileService: FilesService) { }

    @Post('upload')
    @HttpCode(200)
    // @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File): Promise<FileResponseDto[]> {
        const saveArray: MFile[] = [new MFile(file)];
        if (file.mimetype.includes('image')) {
            const buffer = await this.fileService.convertToWebP(file.buffer);
            saveArray.push(new MFile({
                originalname: `${file.originalname.split('.')[0]}.webp`,
                buffer
            }));
        }
        return this.fileService.saveFiles(saveArray);
    }
}
