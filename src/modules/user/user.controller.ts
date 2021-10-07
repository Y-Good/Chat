import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Post('create')
    @ApiOperation({summary:"创建用户"})
    async createUser(@Body() userDto: UserEntity) {
        return await this.userService.saveUser(userDto);
    }

    @UseGuards(AuthGuard("local"))
    @Post('login')
    @ApiOperation({summary:"用户登录"})
    async userLogin(@Req() req: any) {
        return this.authService.login(req.user);
    }


    @Post('token')
    async loginByToken(@Body() tokenDto: any) {
        return await this.userService.loginByToken(tokenDto.token);
    }

    @Get(':uid')
    @ApiOperation({summary:"获取用户信息"})
    async getUserInfo(@Param() param: any) {
        return await this.userService.getUserInfo(param.uid);
    }
}
