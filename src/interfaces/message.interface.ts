import { messageDto } from "src/modules/message/message.dto";

export interface messageInterface extends messageDto {
  name: string;
  avatar: string;
}

