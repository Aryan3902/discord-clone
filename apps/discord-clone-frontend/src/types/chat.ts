export interface ChatInterface {
  channelId: string;
  authorId: string;
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
