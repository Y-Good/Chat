import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMiddleware } from './middlerwares/user.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FriendModule } from './modules/friend/friend.module';
import { FileModule } from './modules/file/file.module';
import { FileController } from './modules/file/file.controller';
import { WsGateway } from './ws/ws.gateway';



@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: '0000',
    database: 'chat',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }), UserModule, AuthModule, FileModule, FriendModule,],
  controllers: [AppController, FileController],
  providers: [AppService, WsGateway],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware) 
      .forRoutes({path:'user/create',method:RequestMethod.POST}); 
  }
}
