import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
@ApiTags('搜索')
@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService:SearchService
    ){}

    //搜索
    @Post()
    async test(@Body() body){
        let user= await this.searchService.getUserSearch(body.key);
        let group = await this.searchService.getGroupSearch(body.key);
        return{user:user,group:group}
    }
}
