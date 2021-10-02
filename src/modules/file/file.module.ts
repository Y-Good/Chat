import { Module } from '@nestjs/common';
import { GroupModule } from '../group/group.module';
import { MessageModule } from '../message/message.module';
import { UserModule } from '../user/user.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports:[UserModule,GroupModule,MessageModule],
  providers: [FileService],
  controllers:[FileController],
  exports:[FileService]
})
export class FileModule {}
