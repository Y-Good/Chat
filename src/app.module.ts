import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMiddleware } from './middlerwares/user.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FriendModule } from './modules/friend/friend.module';
import { FileModule } from './modules/file/file.module';
import { FileController } from './modules/file/file.controller';
import { MessageModule } from './modules/message/message.module';
import { MessageController } from './modules/message/message.controller';
import { GroupModule } from './modules/group/group.module';
import { GroupController } from './modules/group/group.controller';
import { SearchModule } from './modules/search/search.module';
import { SearchController } from './modules/search/search.controller';
import { WsGateway } from './modules/ws/ws.gateway';
import { WsService } from './modules/ws/ws.service';
import { WsModule } from './modules/ws/ws.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '0000',
    database: 'chat',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }), UserModule, AuthModule, FileModule, FriendModule, MessageModule, GroupModule, SearchModule, WsModule,],
  controllers: [FileController, MessageController, GroupController, SearchController],
  providers: [WsGateway, WsService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'user/create', method: RequestMethod.POST });
  }
}
