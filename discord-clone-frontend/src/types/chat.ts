export interface ChatInterface {
  channelId: number;
  authorId: number;
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
