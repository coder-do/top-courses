import { Injectable } from '@nestjs/common';
import { FileResponseDto } from './dto/file-response.dto';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { MFile } from './mFile.class';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {

    async saveFiles(files: MFile[]): Promise<FileResponseDto[]> {
        const date = format(new Date(), 'yyyy-MM-dd');
        const fileFolder = `${path}/uploads/${date}`;
        await ensureDir(fileFolder);
        const res: FileResponseDto[] = [];

        for (const file of files) {
            const writeFileUrl = `${fileFolder}/${file.originalname}`;
            await writeFile(writeFileUrl, file.buffer)
            res.push({ url: writeFileUrl, name: file.originalname })
        }

        return res;
    }

    convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file)
            .webp()
            .toBuffer()
    }
}
