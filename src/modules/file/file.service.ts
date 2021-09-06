import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { UserService } from '../user/user.service';

@Injectable()
export class FileService {
    constructor(private readonly userService:UserService){}
    async saveFile(file:any){
        const writeImage = createWriteStream(join(__dirname, '..','../../public/upload', `${file.originalname}`))
        writeImage.write(file.buffer)
    }

    async saveAvatar(uid:number,filename:string){
        let res = await this.userService.findByAny({'uid':uid});
        res.avatar = filename;
        return await this.userService.updateUser(res);
       
        // return await this.userService.
    }
}
