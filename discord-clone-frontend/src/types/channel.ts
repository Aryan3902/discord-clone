interface ChannelDetails {
  id: number;
  name: string;
  mentions: number;
  unread: boolean;
  isCategory: boolean;
  category: string | null;
}

export type { ChannelDetails };
