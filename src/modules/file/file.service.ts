import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { GroupService } from '../group/group.service';
import { UserService } from '../user/user.service';

@Injectable()
export class FileService {
    constructor(private readonly userService:UserService,private readonly groupService:GroupService){}
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

    async saveGroupIcon(groupID:number,filename:string){
        let res = await this.groupService.findByAny({'groupID':groupID});
        res.icon = filename;
        return await this.groupService.updateGroupInfo(res);
    }
}
