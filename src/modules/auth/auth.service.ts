import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { compares } from 'src/utils/common.utils';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,private readonly jwtService:JwtService) {}
    
      async validate(username: string, password: string): Promise<any> {
    
        const user = await this.userService.findPassword(username);
      
        if(!user){
          throw new UnauthorizedException('无账号');
        }
        // // 注：实际中的密码处理应通过加密措施
        if (await compares(password,user.password)) {
          const { password, ...userInfo } = user;
          return userInfo;
        } else {
          return null;
        }
      }

      async login(user: UserEntity): Promise<any> {
        const { uid, username } = user;
        let token:string = this.jwtService.sign({ username, uid });
        this.userService.saveToken(uid,token);
        return {
          uid:uid,
          token: token,
        };
      }
}
