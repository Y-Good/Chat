import { Injectable, NestMiddleware } from '@nestjs/common';
import { encrypt } from 'src/utils/common';


@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    let { password } = req.body;

    req.body.password = await encrypt(password);

    next();
  }
}
