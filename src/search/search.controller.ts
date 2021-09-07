import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchService } from './search.service';

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
