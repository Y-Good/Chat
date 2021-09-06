import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        } as IStrategyOptions);

    }

    async validate(username: string, password: string): Promise<UserEntity> {
        const user = await this.authService.validate(username, password);
        if (user) {
            return user;
        }
        else {
            throw new UnauthorizedException('密码错误');
        }
    }
}