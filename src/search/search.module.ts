import { Module } from '@nestjs/common';
import { FriendModule } from 'src/modules/friend/friend.module';
import { GroupModule } from 'src/modules/group/group.module';
import { UserModule } from 'src/modules/user/user.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports:[UserModule,GroupModule,FriendModule],
  controllers:[SearchController],
  providers: [SearchService],
  exports:[SearchService]
})
export class SearchModule {}
