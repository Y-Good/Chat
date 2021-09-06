import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private readonly fileService:FileService){}
    @Post('upload')
    @UseInterceptors(FileInterceptor('img'))
    uploadFile(@UploadedFile() file:any,@Body() body:any) {
        this.fileService.saveFile(file);
        this.fileService.saveAvatar(body.uid,file.originalname);
        return "上传成功";
    }
}
