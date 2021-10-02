import { MessageDto } from "src/modules/message/message.dto";

export interface MessageInterface extends MessageDto {
  name: string;
  avatar: string;
}

