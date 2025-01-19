interface ChannelDetails {
  id: number;
  name: string;
  mentions: number;
  unread: boolean;
  isCategory: boolean;
  category: string | null;
}

interface CategoryChannelDetails extends ChannelDetails {
  channels?: ChannelDetails[];
}

export type { ChannelDetails, CategoryChannelDetails };
