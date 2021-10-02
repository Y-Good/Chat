import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { MessageService } from '../message/message.service';
import { FileService } from './file.service';
@ApiTags('文件')
@Controller('file')
export class FileController {
    constructor(private readonly fileService:FileService,private readonly messageService:MessageService){}
    @Post('avatar')
    @UseInterceptors(FileInterceptor('img'))
    uploadAvatar(@UploadedFile() file:any,@Body() body:any) {
        this.fileService.saveFile(file);
        this.fileService.saveAvatar(body.uid,file.originalname);
        return "上传成功";
    }

    @Post('group')
    @UseInterceptors(FileInterceptor('img'))
    uploadGroup(@UploadedFile() file:any,@Body() body:any) {
        this.fileService.saveFile(file);
        this.fileService.saveGroupIcon(body.groupID,file.originalname);
        return "群头像更新成功";
    }

    @Post("message")
    @UseInterceptors(FileInterceptor('img'))
    uploadMsgPic(@UploadedFile() file:any,@Body() body:any){
        this.messageService.saveMsgPic(file);
        return "上传成功";
    }
}
