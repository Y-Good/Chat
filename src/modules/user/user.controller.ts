import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @ApiTags('创建用户')
    @Post('create')
    async createUser(@Body() userDto: UserEntity) {
        return await this.userService.saveUser(userDto);
    }

    @UseGuards(AuthGuard("local"))
    @Post('login')
    async userLogin(@Req() req:any) {
        return this.authService.login(req.user);
    }


    @Post('token')
    async loginByToken(@Body() tokenDto: any) {
        return await this.userService.loginByToken(tokenDto.token);
    }
}
