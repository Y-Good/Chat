import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    //查询所有
    async findAll() {
        return await this.userRepository.find();
    }


    //创建
    async saveUser(userDto: UserEntity) {
        let { username } = userDto;
        let res = await this.findByAny({ 'username': username });

        if (username !== res?.username || res == null) {
            return await this.userRepository.save(userDto);
        }

        throw new UnauthorizedException('用户名已存在');
    }

    //更新用户
    async updateUser(userDto: UserEntity) {
        return await this.userRepository.save(userDto);
    }

    //保存token
    async saveToken(uid: number, token: string) {
        let res = await this.userRepository.findOne({ uid: uid });
        res.token = token;
        return await this.userRepository.save(res);
    }

    //token登录
    async loginByToken(token: string) {
        let res = await this.userRepository.findOne({ token: token })
        if (!res) {
            throw new UnauthorizedException('token错误');
        } else {
            return res;
        }

    }

    //单一条件通用查询
    /**
      * {username:'string'}
      */
    async findByAny(any: any) {
        return await this.userRepository.findOne(any);
    }

    async findPassword(username:string){
        return this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.username=:username',{username:username})
        .getOne()
    }
}
