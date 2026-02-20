import { UserInterface } from "./user";

export interface ChatInterface {
  channelId: number;
  author: UserInterface;
  content: string;
  createdAt: number;
  readBy: number[];
  type: "text";
  metadata?: {
    fileUrl?: string;
  };
}

export interface ChatAction {
  type: string;
  payload: ChatInterface;
}
