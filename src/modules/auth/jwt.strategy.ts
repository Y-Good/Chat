import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { UserEntity } from 'src/entities/user.entity';
import { jwtContants } from './jwt.contants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 获取请求header token值
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: jwtContants.secret,
    }as StrategyOptions );
  }

  async validate(payload: any): Promise<any> {
    // console.log(payload);
    
    //payload：jwt-passport认证jwt通过后解码的结果
    return { username: payload.username, uid: payload.uid };
  }
}